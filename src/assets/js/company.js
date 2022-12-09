import {createLineChart} from "./modules/graphs.js";
import {selectClickedCategory} from "./modules/helper.js";

function init() {
    handleEventListeners();
    createLineChart();
}

function handleEventListeners() {
    selectClickedCategory("#company-chart h4", createLineChart);

    document.querySelectorAll("#years input").forEach(year => {
        year.addEventListener("change", createLineChart)
    })
}

init()