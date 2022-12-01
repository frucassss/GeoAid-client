const btn = document.getElementById('submitbtn');
const appointments = document.getElementById('appointments');
let appointmentNumber = 1;
document.addEventListener('DOMContentLoaded', function() {
    btn.addEventListener('click', submit);
});


function submit() {
    let date = document.querySelector("#date").value;
    let time = document.querySelector('#time').value;
    let expertise = document.querySelector('#expertise').value;
    let employee = document.querySelector('#employee').value;

    appointments.innerHTML += `<div>
    <h3>Appointment ${appointmentNumber++}</h3>
    <p>${date}</p>
    <p>${time}</p>
    <p>${expertise}</p>
    <p>${employee}</p>
    </div> `;
}