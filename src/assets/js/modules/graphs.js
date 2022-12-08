import {
    getCosts, getCrimeTypes, getEmployees, getProfit, getRevenue, getSales, getTotalCrime, getTotalMedicalDispaches,
    getTotalOxygenLeaks, getTotalPopulation
} from "./datafetcher.js";
import {get} from "./api.js";

const FONTCOLOR = "hsl(142deg, 10%, 75%)";
const PIECHARTCOLORSET = ["#c30010", "#de0a26", "#ff2c2c", "#f94449", "#ee6b6e", "#f69697", "#ffcbd1"];
const LINECHARTCOLORSET = ["blue", "red", "orange", "grey", "pink"]
const PRIMARYCOLOR = "#210124"
const SECONDARYCOLOR = "#848FA5"
const SIDEVALUE = {
    revenue: "Revenue in million",
    profit: "Profit in million",
    costs: "Costs in million",
    employees: "Amount of employees",
    sales: "Sales in million",
    crimes: "Amount of crimes",
    oxygen_leaks: "Amount of oxygen leaks",
    population: "population",
    medical_dispaches : "Amount of medical dispaches"
}

export function makeBarchart() {
    deleteOldChart("bar-chart", "category_chart");
    const data = getBarChartData();
    const sideValue = getSideValue();

    const ctx = document.querySelector("#bar-chart").getContext('2d');
    const configuration = {
        type: 'bar',
        data: {
            datasets: [{
                data: data,
            }]
        },
        options: {
            backgroundColor: PRIMARYCOLOR,
            hoverBackgroundColor: SECONDARYCOLOR,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: sideValue,
                        font: {
                            weight: "bold",
                        },
                        color: FONTCOLOR
                    },
                    ticks: {
                        color: FONTCOLOR
                    },
                    suggestedMax: 100
                },
                x: {
                    title: {
                        display: true,
                        text: "Domes",
                        font: {
                            weight: "bold",
                        },
                        color: FONTCOLOR,
                        padding: {
                            bottom: 20
                        }
                    },
                    ticks: {
                        color: FONTCOLOR
                    }
                }
            },
            plugins: {
                legend: { display: false, }
            },
            onClick: changePieChart,
            maintainAspectRatio: false
        }
    }
    new Chart(ctx, configuration);
    return Chart;
}

export function makePieChart() {
    deleteOldChart("pie-chart", "pie-chart-container");

    const data = getPieChartData();

    const ctx = document.querySelector('#pie-chart').getContext('2d');
    const configuration = {
        type: 'doughnut',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: PIECHARTCOLORSET
            }]
        },
        options: {

            plugins: {
                legend: {
                    position: "left",
                    labels: {
                        boxHeight: 20,
                        font: {
                            size: 15
                        },
                        padding: 15,
                        color: FONTCOLOR
                    }

                },
                tooltip: {
                    callbacks: {
                        afterBody: function(context) {
                            return '(in %)';
                        }
                    }
                }
            },
            maintainAspectRatio: false

        }
    }
    new Chart(ctx, configuration);
}

export function makeLineChart() {
    deleteOldChart("line-chart", "company-chart");

    const data = getLineChartData();
    const sideValue = getSideValue();
    const datasets = getDataSets(data);

    const ctx = document.querySelector('#line-chart').getContext('2d');
    const configuration = {
        type: "line",
        data: {
            labels: Object.keys(data[0]),
            datasets: datasets
        },
        options: {
            pointRadius: 4,
            plugins: {
                legend: {
                    labels: {
                        title: {
                            text: 2022
                        },
                        font: {
                            weight: "bold"
                        },
                        color: FONTCOLOR,
                        padding: 10
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: sideValue,
                        font: {
                            weight: "bold"
                        },
                        color: FONTCOLOR
                    },
                    ticks: {
                        color: FONTCOLOR
                    },
                    suggestedMin: 0
                },
                x: {
                    title: {
                        display: true,
                        text: "Months",
                        font: {
                            weight: "bold"
                        },
                        color: FONTCOLOR
                    },
                    ticks: {
                        color: FONTCOLOR
                    }
                }
            },

        },
        maintainAspectRatio: false
    }
    new Chart(ctx, configuration);
}

function getBarChartData() {
    const category = document.querySelector("aside .selected").id;
    const period = document.querySelector("#period").value;

    let data;
    switch(category) {
        case "oxygen-leaks":
            data = getTotalOxygenLeaks(period);
            break;
        case "population":
            data = getTotalPopulation(period);
            break;
        case "medical-dispaches":
            data = getTotalMedicalDispaches(period);
            break;
        default:
            data = getTotalCrime(period);
    }
    return data;
}

function getPieChartData() {
    const domeId = document.querySelector("#dome-choice h2").id;
    return getCrimeTypes(domeId);
}

function getLineChartData() {
    const category = document.querySelector("aside .selected").id;
    const years = getYears();

    let data;
    switch(category) {
        case "profit":
            data = getProfit(years);
            break;
        case "costs":
            data = getCosts(years);
            break;
        case "employees":
            data = getEmployees(years);
            break;
        case "sales":
            data = getSales(years);
            break;
        default:
            data = getRevenue(years);
    }
    return data;
}

function getYears() {
    const res = []
    document.querySelectorAll("#years input").forEach(year => {
        if (year.checked) res.push(year.id)
    })
    return res;
}


function getSideValue() {
    let category = document.querySelector("aside .selected").id;
    category = category.replace("-", "_");
    return SIDEVALUE[category];
}

function getDataSets(data) {
    const res = []
    for (let i = 0; i < data.length; i++) {
        const chart = {
            backgroundColor: LINECHARTCOLORSET[i],
            borderColor: LINECHARTCOLORSET[i],
            borderDash: [5, 5],
            pointBackgroundColor: PRIMARYCOLOR,
            pointBorderColor: PRIMARYCOLOR,
            pointHoverBackgroundColor: SECONDARYCOLOR,
            pointHoverBorderColor: SECONDARYCOLOR,
            label: getYears()[i],
            data: data[i]
        }
        res.push(chart)
    }
    return res;
}

function deleteOldChart(chartId, parentId) {
    const $oldChart = document.querySelector("#" + chartId);
    if ($oldChart) {
        $oldChart.remove();
    }
    const html = `<canvas id="${chartId}"></canvas>`
    const $target = document.querySelector("#" + parentId);
    $target.innerHTML += html;
}

function changePieChart(event, elements) {
    if (elements.length > 0) {
        const clickedElement = this.getElementsAtEventForMode(event, "nearest", {intersect: true}, true);
        const index = clickedElement[0].index;
        get("domes", succesHandler);

        function succesHandler(res) {
            res.json().then(data => {
                data.domes.forEach(dome => {
                    console.log(dome)
                    if (dome.id === index) {
                        const $target = document.querySelector("#types_chart h3");
                        $target.innerText = dome.domeName;
                        $target.id = index;
                        makePieChart();
                    }
                });
            });
        }
    }
}