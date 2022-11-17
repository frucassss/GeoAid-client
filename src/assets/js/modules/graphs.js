export function makeBarchart(data, selector) {
    const ctx = document.querySelector(selector).getContext('2d');
    const configuration = {
        type: 'bar',
        data: {
            datasets: [{
                data: data
            }]
        },
        options: {
            backgroundColor: "blue",
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Amount of crimes",
                        font: {
                            weight: "bold"
                        }
                    },
                    max: 100
                },
                x: {
                    title: {
                        display: true,
                        text: "Domes",
                        font: {
                            weight: "bold",
                        },
                        padding: 10
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Crimes (1 month)",
                    font: {
                        size: 24,
                        weight: "bold"
                    },
                    color: "black",
                    padding: 20
                },
                legend: { display: false, }
            },
            maintainAspectRatio: false
        }
    }
    new Chart(ctx, configuration);
}