import {get, setApi, api } from "./modules/api.js";
import { eventListenerPopup } from "./modules/popup.js";
import {
    eventListenerFullscreen,
    makeSuggestions,
    selectClickedCategory,
    setColorScheme,
    setPosition
} from "./modules/helper.js";
import { createBarChart, createPieChart } from "./modules/graphs.js";

const PIECHARTTITLES = {
    crimes: "Type of crimes",
    oxygen_leaks: "Danger level of oxygen leaks",
    population: "Jobs of population",
    medical_dispaches: "Danger level of medical dispaches",
};

function loadConfig() {
    fetch("config.json")
        .then((resp) => resp.json())
        .then((config) => {
            const api = `${config.host ? config.host + "/" : ""}${config.group ? config.group + "/" : ""}api/`;
            setApi(api);
            init();
        });
}

function init() {
    //getCrimes()
    handleEventListeners();
    setColorScheme();
    //defaultDome();
    //defaultSuggestions();
    //createBarChart();
    //createPieChart();
    eventListenerPopup();

}

function getCrimes() {
    const oldApi = api;
    const newApi = "https://project-ii.ti.howest.be/mars-11/api/"; // using the api of group 11 to get crimes
    setApi(newApi);
    get("incidents", succesHandler);

    function succesHandler(res) {
        res.json().then(data => {
            makeCrimes(data)
        })
    }
}

function makeCrimes(data) {
    console.log(data)
    const res = [];
    data.forEach(incident => {
        const position = setPosition([incident.latitude, incident.longitude]);
        getClosestDome(position, succesHandler);

        function succesHandler(closestDome) {
            const crime = {
                id: incident.id,
                latitude: position[0],
                longitude: position[1],
                dome: closestDome,
                type: incident.type
            };
            res.push(crime);
        }
    });
    console.log(res)
    return res;
}

function getClosestDome(position, func) {
    get("domes", succesHandler);

    function succesHandler(response) {
        response.json().then(data => {
            const domes = data.domes;
            let closestDome = domes[0];
            let minDistance = getDistance(position, domes[0]);
            domes.forEach(dome => {
                const distance = getDistance(position, dome);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestDome = dome;
                }
            });
            func(closestDome);
        })
    }
}

function getDistance(position, dome) {
    const distanceLat = Math.round(position.latitude + dome.latitude);
    const distanceLong = Math.round(position.longitude + dome.longitude);
    return distanceLat + distanceLong;
}
function handleEventListeners() {
    selectClickedCategory("#category_chart h2", function() {
        makeCharts();
        const $target = document.querySelector("#types_chart h2");
        let category = document.querySelector("aside .selected").id;
        category = category.replace("-", "_");
        $target.innerText = PIECHARTTITLES[category];
    });

    document.querySelector("#searchbar input").addEventListener("keyup", function() {
        makeSuggestions(addEventListenersSuggestions);
    });

    document.querySelector("#period").addEventListener("change", makeCharts);

    document.querySelector("#period").addEventListener("change", makeCharts)

    function makeCharts() {
        createBarChart();
        createPieChart();
    }

    eventListenerFullscreen("#category_chart .material-icons", "#category_chart")
}


function addEventListenersSuggestions() {
    document.querySelectorAll("#suggestions li").forEach((li) => {
        li.addEventListener("click", function(ev) {
            const $clicked = ev.currentTarget;
            const id = $clicked.id;
            const domeName = $clicked.querySelector("p").innerText;
            const $target = document.querySelector("#dome-choice h3");
            $target.innerText = domeName;
            $target.id = id;

            createPieChart();
        });
    });
}

function defaultDome() {
    get("domes", succesHandler);

    function succesHandler(res) {
        res.json().then((data) => {
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