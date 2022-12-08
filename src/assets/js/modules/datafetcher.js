import {companyData} from "../../../data/company-data.js";
import {get} from "./api.js";

export function getTotalCrime(period) {
    return {
        "dome 1": 80,
        "dome 2": 50,
        "dome 3": 30,
        "dome 4": 50,
    };
}

export function getTotalOxygenLeaks(period) {
    get("oxygenLeaks", succesHandler)

    function succesHandler(res) {
        res.json().then(data => {
            console.log(data.oxygenLeaks)
        })
    }
    return {
        "dome 1": 100,
        "dome 2": 30,
        "dome 3": 90,
        "dome 4": 10,
    };
}

export function getTotalPopulation(period) {
    return {
        "dome 1": 60,
        "dome 2": 20,
        "dome 3": 10,
        "dome 4": 70,
    };
}

export function getTotalMedicalDispaches(period) {
    return {
        "dome 1": 90,
        "dome 2": 40,
        "dome 3": 5,
        "dome 4": 30,
    };
}

function getDataPerDome() {

}

export function getCrimeTypes(id) {
    let data;
    if (id === 1) {
        data = {
            "Stalking": 30,
            "Arson": 5,
            "Burglary": 20,
            "Domestic abuse": 5,
            "Robbery": 10,
            "Rape": 20,
            "Terrorisme": 10
        };
    } else {
        data = {
            "Stalking": 10,
            "Arson": 20,
            "Burglary": 40,
            "Domestic abuse": 10,
            "Robbery": 5,
            "Rape": 10,
            "Terrorisme": 5
        };
    }

    return Object.fromEntries(
        Object.entries(data).sort(([,a],[,b]) => b-a)
    );
}



export function getRevenue(years) {
    return getDataArray(years, "revenue");
}

export function getProfit(years) {
    return getDataArray(years, "profit");
}

export function getCosts(years) {
    return getDataArray(years, "costs");
}

export function getSales(years) {
    return getDataArray(years, "sales");
}

export function getEmployees(years) {
    return getDataArray(years, "employees");
}

export function getJobs(years) {
    const res = []
    years.forEach(year => {
        const employees = companyData.employees;
        for (const employeesKey in employees) {
            const data = employees[employeesKey][year]
            const dataset = {}
            for (const key in data) {
                dataset[key] = data[key].amount;
            }
            res.push(dataset)
        }
    });
    return res;

}

function getDataArray(years, category) {
    const res = []
    years.forEach(year => {
        res.push(companyData[category][year])
    });
    return res;
}

export function getHeatMapData() {
    return [{
        title: "Crimes",
        data: getCrimes()
    },{
        title: "Oxygen Leaks",
        data: getOxygenLeaks()
    },{
        title: "Population",
        data: getPopulation()
    },{
        title: "Medical Dispaches",
        data: getMedicalDispaches()
    }]
}

function getCrimes() {
    return [[-23, -69, 5],
        [-23, -69, 10],
        [-23.5, -69.5, 7],
        [-23.5, -69.5, 20],
        [-23.3, -69.2, 9],
        [-23.5, -69.5, 11],
        [-21, -67, 10],
        [-22, -68, 20],
        [-24.4730056, -69.3011877, 13],
        [-24.5, -69.3, 11],
        [-24, -66.3, 11],
        [-24.1, -66.25, 20]
    ]
}

function getOxygenLeaks() {
    return getCrimes()
}

function getPopulation() {
    return getCrimes()
}

function getMedicalDispaches() {
    return getCrimes()
}


