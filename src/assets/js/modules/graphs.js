const FONTCOLOR = "hsl(142deg, 10%, 75%)";
const COLORSET = ["#c30010", "#de0a26", "#ff2c2c", "#f94449", "#ee6b6e", "#f69697", "#ffcbd1"];
const PRIMARYCOLOR = "#210124"
const HOVERCOLOR = "#848FA5"

export function makeBarchart(data) {
    const oldChart = document.querySelector("#bar-chart");
    if (oldChart) {
        oldChart.remove();
    }
    const html = "<canvas id=\"bar-chart\"></canvas>"
    const target = document.querySelector("#category_chart");
    target.innerHTML += html;

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
            hoverBackgroundColor: HOVERCOLOR,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Amount of crimes",
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
            maintainAspectRatio: false
        }
    }
    new Chart(ctx, configuration);
    return Chart;
}

export function makePieChart(data) {
    const oldChart = document.querySelector("#pie-chart");
    if (oldChart) {
        oldChart.remove();
    }
    const html = "<canvas id=\"pie-chart\"></canvas>"
    const target = document.querySelector("#types_chart");
    target.innerHTML += html;

    const ctx = document.querySelector('#pie-chart').getContext('2d');
    const configuration = {
        type: 'doughnut',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: COLORSET
            }]
        },
        options: {

            plugins: {
                legend: {
                    position: "left",
                    labels: {
                        boxHeight: 28,
                        font: {
                            size: 20
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