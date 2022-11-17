import {getTotalCrime} from "./modules/datafetcher.js";
import {makeBarchart} from "./modules/graphs.js";

function init() {
    const data = getTotalCrime();
    makeBarchart(data, "#bar-chart");
}

init();