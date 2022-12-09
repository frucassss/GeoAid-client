import {makeLineChart} from "./modules/graphs.js";
import {selectClickedCategory} from "./modules/helper.js";

function init() {
    handleEventListeners();
    makeLineChart();
}

function handleEventListeners() {
    selectClickedCategory("#company-chart h4", makeLineChart);

    document.querySelectorAll("#years input").forEach(year => {
        year.addEventListener("change", makeLineChart)
    })
}

init()