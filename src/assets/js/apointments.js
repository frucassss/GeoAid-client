const btn = document.getElementById("submitbtn");
const article = document.getElementById("appointment-list");
const appointments = document.getElementById("appointments");
let appointmentNumber = 1;
document.addEventListener("DOMContentLoaded", function (e) {
  btn.addEventListener("click", submit);
});

function submit(e) {
  e.preventDefault();
  article.classList.remove("hidden");
  let date = document.querySelector("#date").value;
  let time = document.querySelector("#time").value;
  let expertise = document.querySelector("#expertise").value;
  let employee = document.querySelector("#employee").value;
  let subject = document.querySelector("#subject").value;

  appointments.innerHTML += `<div>
    <h3>Appointment ${appointmentNumber++}</h3>
    <h3>Subject: ${subject}</h3>
    <p>Date: ${date}</p>
    <p>Hour: ${time}</p>
    <p>Expertise: ${expertise}</p>
    <p>Employee: ${employee}</p>
    </div> `;
}
