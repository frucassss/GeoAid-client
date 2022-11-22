let api;

document.addEventListener("DOMContentLoaded", loadConfig);

// Entry point for the JS code.
function init() {
    // Very small proof of concept.
    //poc();
    setTimeout(startupAnimation, 2500);
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(makeMapCurrentPosition, makeMapDefaultPosition);
    }
    createDomeIcons();
    setTimeout(get("domes", getDomes), 3000);
    
}

function makeMapCurrentPosition(currentPosition) {
    const coords = currentPosition.coords;
    const lat = coords.latitude - 75.5;
    const lon = coords.longitude - 73;
    createMap([lat, lon])
}

function makeMapDefaultPosition(){
    createMap([-23, -69])
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


