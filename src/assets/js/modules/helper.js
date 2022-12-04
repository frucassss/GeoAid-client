import {get, setApi} from "./api.js";

export let arrayDomes;

export function loadConfig() {
    fetch("config.json")
        .then(resp => resp.json())
        .then(config => {
            const api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;
            setApi(api);
        });
}

export function makeHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.add("hidden");
}

export function removeHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.remove("hidden");
}

export function selectClickedCategory(func, selector) {
    document.querySelectorAll("aside li").forEach(li => {
        li.addEventListener("click", function (ev) {

            document.querySelectorAll("aside li").forEach(li => {
                li.classList.remove("selected");
            });
            const currentTarget = ev.currentTarget;
            currentTarget.classList.add("selected");

            const oldTitle = document.querySelector(selector);
            const newTitle = currentTarget.querySelector("p").innerText;
            oldTitle.innerText = newTitle;

            func();
        })
    })
}

export function makeSuggestions(addEventListeners) {
    get("domes", addDomes);
    arrayDomes = arrayDomes
        .filter(dome => filterDomes(dome.domeName));
    showSuggestions(arrayDomes);

    addEventListeners();

    function addDomes(response) {
        response.json().then(data => arrayDomes = data.domes);
    }

}

function filterDomes(domeName) {
    const search = document.querySelector("#searchbar input").value;
    const searchLength = search.length;
    for (let i = 0; i < searchLength; i++) {
        if (domeName.charAt(i).toLowerCase() !== search.charAt(i).toLowerCase()) return false
    }
    return true;
}

function showSuggestions(domes) {
    const target = document.querySelector('#suggestions');
    target.innerHTML = '';
    domes.forEach(dome => {
        const  html = `<li id="${dome.id}"><p class="hover-underline-animation">${dome.domeName}</p></li>`;
        target.innerHTML += html;
    })
}

export function random() {
    document.querySelector('#searchbar input').addEventListener("keydown", (event) => {
        console.log("lesgo")
        makeSuggestions(addEventListenersSuggestions);
    });
}

