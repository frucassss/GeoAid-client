import {createLineChart} from "./modules/graphs.js";
import {eventListenerFullscreen, selectClickedCategory} from "./modules/helper.js";

function init() {
    handleEventListeners();
    createLineChart();
}

function handleEventListeners() {
    selectClickedCategory("#company-chart h4", createLineChart);

    document.querySelectorAll("#years input").forEach(year => {
        year.addEventListener("change", createLineChart)
    });

    console.log(document.querySelectorAll("#company-chart"))
    eventListenerFullscreen("#company-chart .material-icons", "#company-chart")
}

init()