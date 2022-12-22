import {makeHidden, removeHidden, setColorScheme} from "./modules/helper.js";
import {eventListenerPopup, hidePopup, showPopup} from "./modules/popup.js";
import {get, post, setApi, remove} from "./modules/api.js";

function loadConfig() {
  fetch("config.json")
      .then((resp) => resp.json())
      .then((config) => {
        const api = `${config.host ? config.host + "/" : ""}${config.group ? config.group + "/" : ""}api/`;
        setApi(api);
        init();
      });
}

function init() {
  handleEventListeners();
  formatAppointmentInput();
  displayAppointments();
  setColorScheme();
  eventListenerPopup();
}

function handleEventListeners() {
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    submitAppointment();
  });
}

function formatAppointmentInput() {
  document.querySelector("#date").valueAsDate = new Date();

}

function displayAppointments() {
  removeHidden(".spinner-wave-in");
  const $target = document.querySelector("#appointments");
  $target.innerHTML = "";

  get("appointments", succesHandler)
  function succesHandler(res) {
    const $target = document.querySelector("#appointment-list");
    const list =  `<div id="appointments"></div>`;
    $target.insertAdjacentHTML("afterend", list);
    res.json().then(data => {
      const appointments = data.appointments;
      appointments.forEach(appointment => {
        const clone = document.querySelector("#clone-appointment").cloneNode(true);
        clone.classList.remove("hidden");
        clone.id = appointment.id;
        clone.querySelector(".subject").innerText = appointment.topic;
        clone.querySelector(".date").innerText = appointment.date;
        clone.querySelector(".time").innerText = appointment.time;
        clone.querySelector(".expertise").innerText = appointment.expertise;
        clone.querySelector(".employee").innerText = appointment.employeeId;
        clone.querySelector(".delete").addEventListener("click", deleteAppointment);
        $target.appendChild(clone);
      })
      makeHidden(".spinner-wave-in");
    });
  }
}

function deleteAppointment(e) {
  e.preventDefault();
  const $appointment = e.target.closest(".appointment");
  const id = $appointment.id;

  showPopup(e, "delete");
  document.querySelector("#popup-delete #no").addEventListener("click", hidePopup);
  document.querySelector("#popup-delete #yes").addEventListener("click", function (e) {
    e.preventDefault();
    hidePopup(e);
    showPopup(e, "deleted");
    remove(`appointment/${id}`, displayAppointments);
  });
}

function submitAppointment(e) {
  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;
  const expertise = document.querySelector("#expertise").value;
  const employee = document.querySelector("#employee").value;
  const subject = document.querySelector("#subject").value;

  const body = {
    "date": date,
    "time": time,
    "topic": subject,
    "employee_id": 1,
    "expertise": expertise
  };
  console.log(body)

  const valid = checkBodyValid(body);
  if (valid) {
    changeValuesPopup(body);
    post("appointment", body, displayAppointments);
    console.log("hey")
    showPopup(e, "submit");
  } else {
    console.log("failed")
  }
}

function checkBodyValid(body) {
  let res = `<p></p>`
  if (new Date(body.date) <= new Date()) {
    const $dateInput = document.querySelector("#date");
    $dateInput.setCustomValidity("You can't book an appointment in the past.");
    $dateInput.reportValidity();
  }
  console.log(body)
  if (!body.topic) {
    const $subjectInput = document.querySelector("#subject");
    $subjectInput.setCustomValidity("Please fill in the subject.");
    $subjectInput.reportValidity();
  }
  return false; // !/^[0-1]{2}:[0-9]{2}$/.test(value)
}

function changeValuesPopup(body) {
  const $target = document.querySelector("#popup-submit");
  $target.querySelector(".date").innerText = body.date;
  $target.querySelector(".time").innerText = body.time;
  $target.querySelector(".subject").innerText = body.topic;
  $target.querySelector(".employee").innerText = body.employee_id;
  $target.querySelector(".expertise").innerText = body.expertise;
}

loadConfig();