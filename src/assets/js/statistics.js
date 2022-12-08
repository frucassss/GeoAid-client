import {makeSuggestions, selectClickedCategory} from "./modules/helper.js";
import {createBarChart, createPieChart} from "./modules/graphs.js";
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
    defaultDome();
    defaultSuggestions();
    createBarChart();
    createPieChart();
}

function handleEventListeners() {
    selectClickedCategory(makeCharts, "#category_chart h2");

    document.querySelector('#searchbar input').addEventListener("keyup", function () {
        makeSuggestions(addEventListenersSuggestions);
    });

    document.querySelector("#period").addEventListener("change", makeCharts)

    function makeCharts() {
        createBarChart();
        createPieChart();
    }
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

            createPieChart();
        })
    })
}

function defaultDome() {
    get("domes", succesHandler);

    function succesHandler(res) {
        (res.json()).then((data) => {
            const $target = document.querySelector("#dome-choice h3");
            const domeName = data.domes[0].domeName;
            $target.innerText = domeName;
        });
    }
}

function defaultSuggestions() {
    makeSuggestions(addEventListenersSuggestions);
}

loadConfig();