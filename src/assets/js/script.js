import {get, setApi} from "./modules/api.js";
import {createMap, center, setView} from "./modules/map.js";
import { makeHidden, removeHidden } from "./modules/helper.js";

let arrayDomes = [];

function init() {
    handleEventListeners();
    setTimeout(startupAnimation, 2500);
    makeMap();
}

function loadConfig() {
    fetch("config.json")
        .then(resp => resp.json())
        .then(config => {
            const api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;
            setApi(api);
            init();
        });
}

function makeMap() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(makeMapCurrentPosition, makeMapDefaultPosition);
    }
}

function handleEventListeners() {
    document.querySelector('.center').addEventListener("click", function() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(center, handleError);
        }
    });
    document.querySelector('#searchbar input').addEventListener("keyup", makeSuggestions);

    document.querySelector(".close").addEventListener("click", () => {
        makeHidden("#side_navigation");
    })
    document.querySelector(".menu").addEventListener("click", () => {
        removeHidden("#side_navigation");
    })
}

function makeSuggestions() {
    get("domes", addDomes);
    arrayDomes = arrayDomes
        .filter(dome => filterDomes(dome.domeName));
    showSuggestions(arrayDomes);
}

function filterDomes(domeName) {
    const search = document.querySelector("#searchbar input").value;
    const searchLength = search.length;
    for (let i = 0; i < searchLength; i++) {
        if (domeName.charAt(i).toLowerCase() !== search.charAt(i).toLowerCase()) return false
    }
    return true;
}

function addDomes(response) {
    response.json().then(data => arrayDomes = data.domes);
}

function showSuggestions(domes) {
    const target = document.querySelector('#suggestions');
    target.innerHTML = '';
    domes.forEach(dome => {
        const  html = `<li id="${dome.id}"><p class="hover-underline-animation">${dome.domeName}</p></li>`;
        target.innerHTML += html;
    })
    addEventListeners();
}

function addEventListeners() {
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

function makeMapCurrentPosition(currentPosition) {
    const coords = currentPosition.coords;
    const lat = coords.latitude - 75.5;
    const lon = coords.longitude - 73;
    createMap([lat, lon], true)
}

function makeMapDefaultPosition() {
    createMap([-23, -69], false);
}

function startupAnimation() {
    const loader = document.querySelector(".loading");
    const map = document.querySelector("#map");
    loader.classList.add("invisible");
    map.classList.remove("hidden");
}

loadConfig();