let api;

document.addEventListener("DOMContentLoaded", loadConfig);

// Entry point for the JS code.
function init() {
    // Very small proof of concept.
    //poc();
    console.log("hi");
    setTimeout(startupAnimaiton, 2500);

    createMap();
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
    const map = document.querySelector("#map");
    loader.classList.add("invisible");
    map.classList.remove("hidden");
}

function createMap() {
    map = L.map('map', {
        maxZoom: 20,
        minZoom: 6,
        zoomControl: false
    }).setView([36, -112], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
    }).addTo(map);
    setZoomTopRight();
}

function setZoomTopRight() {
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
}
