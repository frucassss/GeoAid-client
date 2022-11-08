let api;

document.addEventListener("DOMContentLoaded", loadConfig);

// Entry point for the JS code.
function init() {
    // Very small proof of concept.
    //poc();
    console.log("hi");
    setTimeout(startupAnimaiton, 2500);
}

function loadConfig() {
    fetch("config.json")
        .then(resp => resp.json())
        .then(config => {
            api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;
            init();
        });
}

function startupAnimaiton() {
    const loader = document.querySelector(".loading");
    const h1 = document.querySelector("h1");
    loader.classList.add("hidden");
    h1.classList.remove("hidden");
    h1.classList.add("lineup");
}