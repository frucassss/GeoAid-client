import {createMap, center, setView} from "./modules/map.js";
import {makeHidden, removeHidden, makeSuggestions} from "./modules/helper.js";
import {get, setApi} from "./modules/api.js";

function loadConfig() {
    fetch("config.json")
        .then(resp => resp.json())
        .then(config => {
            const api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;
            setApi(api);
            init();
        });
}

function init() {
    handleEventListeners();
    setTimeout(startupAnimation, 2500);
    makeMap();
}

function makeMap() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(makeMapCurrentPosition, makeMapDefaultPosition);
    }
}

function makeMapCurrentPosition(currentPosition) {
    const coords = currentPosition.coords;
    const lat = coords.latitude - 75.5;
    const lon = coords.longitude - 73;
    createMap([lat, lon], true)
}

function makeMapDefaultPosition() {
    createMap([-23, -69], false);
}

function handleEventListeners() {
    document.querySelector('.center').addEventListener("click", function() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(center, handleError);
        }
    });

    document.querySelector('#searchbar input').addEventListener("keyup", function () {
        makeSuggestions(addEventListenersSuggestions);
    });

    document.querySelector(".close").addEventListener("click", () => {
        makeHidden("#side_navigation");
    })
    document.querySelector(".menu").addEventListener("click", () => {
        removeHidden("#side_navigation");
    })
}

function addEventListenersSuggestions() {
    document.querySelectorAll('#suggestions li').forEach(li => {
        li.addEventListener("click", function (ev) {
            const target = ev.currentTarget.id;
            changeview(target)
        })
    })
}

function changeview(search) {
    get("domes", succesHandler)

    function succesHandler(response) {
        response.json().then(data => {
            const domes = data.domes
            for (const i in domes) {
                const dome = domes[i];
                if (dome.id === parseInt(search)) {
                    setView([dome.latitude, dome.longitude]);
                }
            }
        })
    }
}

function handleError() {
    console.log("Give permission");
}

function startupAnimation() {
    const loader = document.querySelector(".loading");
    const map = document.querySelector("#map");
    loader.classList.add("invisible");
    map.classList.remove("hidden");
}

loadConfig();