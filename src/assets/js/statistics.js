import {makeSuggestions, selectClickedCategory} from "./modules/helper.js";
import {makeBarchart, makePieChart} from "./modules/graphs.js";
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

function defaultDome() {
    get("domes", succesHandler);

    function succesHandler(res) {
        (res.json()).then((data) => {
            const $target = document.querySelector("#dome-choice h3");
            const domeName = data.domes[0].domeName
            $target.innerText = domeName;
        });
    }
}

loadConfig();