const btn = document.getElementById("helpbutton");
const helpdiv = document.getElementById("helper");

document.addEventListener("DOMContentLoaded", function () {
    btn.addEventListener("click", showhelp);
});

function showhelp() {
    helpdiv.classList.remove("hidden");
}