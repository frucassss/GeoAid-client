import {makeLineChart} from "./modules/graphs.js";
import {selectClickedCategory} from "./modules/helper.js";

function init() {
    handleEventListeners();
    makeLineChart();
}

function handleEventListeners() {
    selectClickedCategory(makeLineChart, "#company-chart h4");
}

init()