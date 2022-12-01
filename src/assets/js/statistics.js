import {selectClickedCategory} from "./modules/helper.js";
import {makeBarchart, makePieChart} from "./modules/graphs.js";

function init() {
    handleEventListeners();
    makeBarchart();
    makePieChart();
}

function handleEventListeners() {
    selectClickedCategory(makeBarchart, "#category_chart h2");
}

init();