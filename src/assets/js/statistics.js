import {getTotalCrime, getTotalOxygenLeaks, getTotalPopulation, getTotalMedicalDispaches, getCrimeTypes} from "./modules/datafetcher.js";
import {makeBarchart, makePieChart} from "./modules/graphs.js";

function init() {
    // handleEventListeners();
    const categoryData = getTotalCrime();
    makeBarchart(categoryData);
    //const domeId = document.querySelector("#dome-choice h2").id;
    const typeData = getCrimeTypes(0);
    makePieChart(typeData);




    function handleEventListeners() {
        document.querySelector("#types_chart .arrow_forward_ios").addEventListener("click", function () {
            console.log("plus")
            let domeId = document.querySelector("#dome-choice h2").id;
            if (domeId <= 3) { // length of all domes - 1
                const newDomeId = parseInt(domeId) + 1;
                document.querySelector("#dome-choice h2").id = newDomeId.toString();
                const typeData = getCrimeTypes(domeId);
                makePieChart(typeData);
            }
        })

        document.querySelector("#types_chart .arrow_back_ios").addEventListener("click", function () {
            console.log("hey")
            let domeId = document.querySelector("#dome-choice h2").id;
            if (domeId <= 0) {
                console.log("ola")
                const newDomeId = parseInt(domeId) - 1;
                document.querySelector("#dome-choice h2").id = newDomeId.toString();
                const typeData = getCrimeTypes(domeId);
                makePieChart(typeData);
            }
        })

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
}

init();