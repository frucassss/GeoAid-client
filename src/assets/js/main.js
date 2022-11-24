let api;

document.addEventListener("DOMContentLoaded", loadConfig);

// Entry point for the JS code.
function init() {
    // Very small proof of concept.
    //poc();
    setTimeout(startupAnimation, 2500);
    createMap();
    createDomeIcons();
    setTimeout(get("domes", getDomes), 3000);
    
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


