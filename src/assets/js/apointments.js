const btn = document.getElementById("submitbtn");
const article = document.getElementById("appointment-list");
const appointments = document.getElementById("appointments");
let appointmentNumber = 1;
document.addEventListener("DOMContentLoaded", function () {
  btn.addEventListener("click", submit);
});

function submit() {
  article.classList.remove("hidden");
  let date = document.querySelector("#date").value;
  let time = document.querySelector("#time").value;
  let expertise = document.querySelector("#expertise").value;
  let employee = document.querySelector("#employee").value;

  appointments.innerHTML += `<div>
    <h3>Appointment ${appointmentNumber++}</h3>
    <p>Date: ${date}</p>
    <p>Hour: ${time}</p>
    <p>Expertise: ${expertise}</p>
    <p>Employee: ${employee}</p>
    </div> `;
}
