import {setApi} from "./modules/api.js";
import {createMap, center, setView} from "./modules/map.js";
import {makeHidden, removeHidden, makeSuggestions, arrayDomes, loadConfig} from "./modules/helper.js";

function init() {
    loadConfig()
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
            const position = findPosition(target)
            setView(position);
        })
    })
}

function findPosition(search) {
    for (const i in arrayDomes) {
        const dome = arrayDomes[i];
        if (dome.id === parseInt(search)) {
            return [dome.latitude, dome.longitude];
        }
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

init();