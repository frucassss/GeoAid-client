import {eventListenerFullscreen, makeSuggestions, selectClickedCategory} from "./modules/helper.js";
import {createBarChart, createPieChart} from "./modules/graphs.js";
import {get, setApi} from "./modules/api.js";

const PIECHARTTITLES = {
    crimes: "Type of crimes",
    oxygen_leaks: "Danger level of oxygen leaks",
    population: "Jobs of population",
    medical_dispaches: "Danger level of medical dispaches"
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
function init() {
    handleEventListeners();
    defaultDome();
    defaultSuggestions();
    createBarChart();
    createPieChart();
}

function handleEventListeners() {
    selectClickedCategory("#category_chart h2", function () {
        makeCharts();
        const $target = document.querySelector("#types_chart h2");
        let category = document.querySelector("aside .selected").id;
        category = category.replace("-","_");
        $target.innerText = PIECHARTTITLES[category];
    });

    document.querySelector('#searchbar input').addEventListener("keyup", function () {
        makeSuggestions(addEventListenersSuggestions);
    });

    document.querySelector("#period").addEventListener("change", makeCharts)

    function makeCharts() {
        createBarChart();
        createPieChart();
    }

    eventListenerFullscreen("#category_chart .material-icons", "#category_chart")
}


function addEventListenersSuggestions() {
    document.querySelectorAll('#suggestions li').forEach(li => {
        li.addEventListener("click", function (ev) {
            const $clicked = ev.currentTarget;
            const id = $clicked.id;
            const domeName = $clicked.querySelector("p").innerText;
            const $target = document.querySelector("#dome-choice h3");
            $target.innerText = domeName;
            $target.id = id;

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