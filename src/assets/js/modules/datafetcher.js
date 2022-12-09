import {companyData} from "../../../data/company-data.js";
import {get} from "./api.js";

const APICALLS = {
    crimes: "oxygenLeaks",
    oxygen_leaks: "oxygenLeaks",
    population: "oxygenLeaks",
    medical_dispaches: "oxygenLeaks"
}

// MAP
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

// BAR CHART
export function getBarChartData(category, period, func) {
    category = category.replace("-","_");
    period = parseInt(period);
    const apiCall = APICALLS[category];
    get(apiCall, succesHandler);

    function succesHandler(res) {
        res.json().then(data => {
            let dataPerDome = createLabels(data[apiCall], "domeId");
            data = data[apiCall]
                .filter(obj => filterOnPeriod(obj, period))
            dataPerDome = getDataPerDome(dataPerDome, data);
            func(dataPerDome);
        });
    }
}

function filterOnPeriod(obj, period) {
    if (period === 0) return true;
    const now = new Date();
    const currentMonth = now.getMonth();
    const beginMonth = currentMonth - period;
    now.setMonth(beginMonth);

    const objDate = new Date(obj.date);
    return objDate > now;

}

function createLabels(data, key) {
    let res = {}
    data.forEach(el => {
        res[el[key]] = 0;
    });
    return res;
}

function getDataPerDome(dataPerDome, data) {
    data.forEach(obj => {
        dataPerDome[obj.domeId] += 1;
    });
    return dataPerDome;
}

// PIE CHART
export function getPieChartData(category, period, domeId, func) {
    category = category.replace("-","_");
    period = parseInt(period);
    domeId = parseInt(domeId);
    const apiCall = APICALLS[category];
    get(apiCall, succesHandler);

    function succesHandler(res) {
        res.json().then(data => {
            let dataPerType = createLabels(data[apiCall], "dangerLevel");
            data = data[apiCall]
                .filter(obj => obj.domeId === domeId)
                .filter(obj => filterOnPeriod(obj, period));
            dataPerType = getDataPerType(dataPerType, data);
            dataPerType = addPercentage(dataPerType);
            Object.entries(dataPerType).sort(([,a],[,b]) => b-a);
            func(dataPerType);
        })
    }
}

function getDataPerType(dataPerType, data) {
    data.forEach(obj => {
        dataPerType[obj.dangerLevel] += 1;
    });
    return dataPerType;
}

function addPercentage(dataPerType) {
    const total = Object.values(dataPerType).reduce((a, b) => a + b);
    for (const dataPerTypeKey in dataPerType) {
        const value = dataPerType[dataPerTypeKey];
        const percentage = (value / total * 100).toFixed(0);
        delete Object.assign(dataPerType, {[" (" + percentage + "%) " + dataPerTypeKey]: dataPerType[dataPerTypeKey] })[dataPerTypeKey];
    }
    return dataPerType
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

// LINE CHART
export function getLineChartData(category, years) {
    const res = []
    years.forEach(year => {
        res.push(companyData[category][year])
    });
    return res;
}


