import {createLineChart} from "./modules/graphs.js";
import {eventListenerFullscreen, selectClickedCategory, setColorScheme} from "./modules/helper.js";

function init() {
    handleEventListeners();
    setColorScheme();
    createLineChart();

    const html = document.querySelector('html');
    html.dataset.theme = `theme-light`;
}

function handleEventListeners() {
    selectClickedCategory("#company-chart h4", createLineChart);

    document.querySelectorAll("#years input").forEach(year => {
        year.addEventListener("change", createLineChart)
    });

    eventListenerFullscreen("#company-chart .material-icons", "#company-chart")
}

init();