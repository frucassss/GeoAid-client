import {
    getBarChartData, getPieChartData, getLineChartData
} from "./datafetcher.js";
import {searchDome} from "./helper.js";

const FONTCOLOR = "hsl(142deg, 10%, 75%)";
const PIECHARTCOLORSET = {
    light: ["#3d2117", "#4e2117", "#5e2117", "#6e2117", "#7e2117", "#8e2117", "#9e2117"],
    dark: ["#1f1f1f", "#2f1f1f", "#3f1f1f", "#4f1f1f", "#5f1f1f"]
};
const LINECHARTCOLORSET = ["blue", "red", "orange", "grey", "pink"];
const PRIMARYCOLOR = {
    light: "#3d2117",
    dark: "#1f1f1f"
};
const SECONDARYCOLOR = {
    light: "#C67B5C",
    dark: "#8a8a8a"
};
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
};

export function createBarChart() {
    const category = document.querySelector("aside .selected").id;
    const period = document.querySelector("#period").value;
    getBarChartData(category, period, makeBarChart);
}

function makeBarChart(data) {
    deleteOldChart("bar-chart", "bar-chart-container");
    const sideValue = getSideValue();
    const theme = localStorage.getItem("color-theme");

    const ctx = document.querySelector("#bar-chart").getContext('2d');
    const configuration = {
        type: 'bar',
        data: {
            datasets: [{
                data: data,
            }]
        },
        options: {
            backgroundColor: PRIMARYCOLOR[theme],
            hoverBackgroundColor: SECONDARYCOLOR[theme],
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
                    suggestedMin: 0
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

export function createPieChart() {
    const category = document.querySelector("aside .selected").id;
    const period = document.querySelector("#period").value;
    const domeId = document.querySelector("#dome-choice h3").id;
    getPieChartData(category, period, domeId, makePieChart);
}

function makePieChart(data) {
    deleteOldChart("pie-chart", "pie-chart-container");
    const theme = localStorage.getItem("color-theme");

    const ctx = document.querySelector('#pie-chart').getContext('2d');
    const configuration = {
        type: 'doughnut',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: PIECHARTCOLORSET[theme]
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

                }
            },
            maintainAspectRatio: false
        },
    }
    new Chart(ctx, configuration);
}

export function createLineChart() {
    const category = document.querySelector("aside .selected").id;
    const years = getYears();
    const data =  getLineChartData(category, years);
    makeLineChart(data);
}

function makeLineChart(data) {
    deleteOldChart("line-chart", "line-chart-container");

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
    const res = [];
    const theme = localStorage.getItem("color-theme");
    for (let i = 0; i < data.length; i++) {
        const chart = {
            backgroundColor: LINECHARTCOLORSET[i],
            borderColor: LINECHARTCOLORSET[i],
            borderDash: [5, 5],
            pointBackgroundColor: PRIMARYCOLOR[theme],
            pointBorderColor: PRIMARYCOLOR[theme],
            pointHoverBackgroundColor: SECONDARYCOLOR[theme],
            pointHoverBorderColor: SECONDARYCOLOR[theme],
            label: getYears()[i],
            data: data[i]
        }
        res.push(chart)
    }
    return res;
}

function changePieChart(event, elements) {
    if (elements.length > 0) {
        const clickedElement = this.getElementsAtEventForMode(event, "nearest", {intersect: true}, true);
        const index = clickedElement[0].index;

        searchDome(index, succesHandler)
        function succesHandler(dome) {
            const $target = document.querySelector("#types_chart h3");
            $target.innerText = dome.domeName;
            $target.id = index;
            createPieChart()
        }
    }
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