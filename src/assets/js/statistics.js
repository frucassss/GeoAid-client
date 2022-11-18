import {getTotalCrime, getTotalOxygenLeaks, getTotalPopulation, getTotalMedicalDispaches, getCrimeTypes} from "./modules/datafetcher.js";
import {makeBarchart, makePieChart} from "./modules/graphs.js";

function init() {
    const categoryData = getTotalCrime();
    makeBarchart(categoryData);
    const typeData = getCrimeTypes();
    makePieChart(typeData);

    document.querySelectorAll("aside li").forEach(li => {
        li.addEventListener("click", function (ev) {
            document.querySelectorAll("aside li").forEach(li => {
                li.classList.remove("selected");
            })
            const currentTarget = ev.currentTarget;
            currentTarget.classList.add("selected");
            const category = currentTarget.id;
            let data;
            switch(category) {
                case "oxygen-leaks":
                    data = getTotalOxygenLeaks();
                    break;
                case "population":
                    data = getTotalPopulation();
                    break;
                case "medical-dispaches":
                    data = getTotalMedicalDispaches();
                    break;
                default:
                    data = getTotalCrime();
            }
            makeBarchart(data)
        })
    })
}

init();