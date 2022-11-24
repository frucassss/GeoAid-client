let api;

document.addEventListener("DOMContentLoaded", loadConfig);

function init() {
    // handleEventListeners();
    setTimeout(startupAnimation, 2500);
    makeMap();
}

function makeMap() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(makeMapCurrentPosition, makeMapDefaultPosition);
    }
}

function handleEventListeners() {
    document.querySelector('#center').addEventListener("click", makeMap);
}

function makeMapCurrentPosition(currentPosition) {
    const coords = currentPosition.coords;
    const lat = coords.latitude - 75.5;
    const lon = coords.longitude - 73;
    createMap([lat, lon], true)
}

function makeMapDefaultPosition() {
    createMap([-23, -69], false)
}

function loadConfig() {
    fetch("config.json")
        .then(resp => resp.json())
        .then(config => {
            api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;
            init();
        });
}

function startupAnimation() {
    const loader = document.querySelector(".loading");
    const map = document.querySelector("#map");
    loader.classList.add("invisible");
    map.classList.remove("hidden");
}