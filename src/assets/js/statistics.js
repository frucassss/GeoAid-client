import {loadConfig, makeSuggestions, random, selectClickedCategory} from "./modules/helper.js";
import {makeBarchart, makePieChart} from "./modules/graphs.js";

function init() {
    loadConfig();
    handleEventListeners();
    makeBarchart();
    makePieChart();
}

function handleEventListeners() {
    selectClickedCategory(makeBarchart, "#category_chart h2");

    document.querySelector('#searchbar input').addEventListener("keyup", function () {
        makeSuggestions(addEventListenersSuggestions);
    });
}

function addEventListenersSuggestions() {
    document.querySelectorAll('#suggestions li').forEach(li => {
        li.addEventListener("click", function (ev) {
            const $clicked = ev.currentTarget;
            const id = $clicked.id;
            const domeName = $clicked.querySelector("p").innerText;
            const html = `<h3 id=${id}>${domeName}</h3>`

            const $target = document.querySelector("#dome-choice h3");
            $target.innerHTML = html;

            makePieChart();
        })
    })
}

init();