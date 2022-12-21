import {setColorScheme} from "./modules/helper.js";
import {eventListenerPopup, showPopup} from "./modules/popup.js";
import {get, post, setApi} from "./modules/api.js";

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
  displayAppointments();
  setColorScheme();
  eventListenerPopup();
}

function handleEventListeners() {
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    submitAppointment();
    showPopup(e, "submit");
  });
}

function displayAppointments() {
  const $target = document.querySelector("#appointments");
  $target.innerHTML = "";

  get("appointments", succesHandler)
  function succesHandler(res) {
    res.json().then(data => {
      const appointments = data.appointments;
      appointments.forEach(appointment => {
        const clone = document.querySelector("#clone-appointment").cloneNode(true);
        clone.classList.remove("hidden")
        clone.querySelector(".subject").innerText = appointment.topic;
        clone.querySelector(".date").innerText = appointment.date;
        clone.querySelector(".time").innerText = appointment.time;
        clone.querySelector(".expertise").innerText = appointment.expertise;
        clone.querySelector(".employee").innerText = appointment.employeeId;
        $target.appendChild(clone);
      })
    });
  }
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

  changeValuesPopup(body);
  post("appointment", body, displayAppointments);
}

function changeValuesPopup(body) {
  console.log("hey")
  const $target = document.querySelector("#popup-submit");
  $target.querySelector(".date").innerText = body.date;
  $target.querySelector(".time").innerText = body.time;
  $target.querySelector(".subject").innerText = body.topic;
  $target.querySelector(".employee").innerText = body.employee_id;
  $target.querySelector(".expertise").innerText = body.expertise;
}

loadConfig();