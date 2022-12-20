import {companyData} from "../../../data/company-data.js";
import {get} from "./api.js";
import {searchDome} from "./helper.js";

const APICALLS = {
    crimes: "oxygenLeaks",
    oxygen_leaks: "oxygenLeaks",
    population: "oxygenLeaks",
    medical_dispaches: "oxygenLeaks"
}

const CATEGORYTYPES = {
    crimes: "dangerLevel",
    oxygen_leaks: "dangerLevel",
    population: "dangerLevel",
    medical_dispaches: "dangerLevel"
}

const HEATMAPS = [{
    title: "Crimes",
    dataApiCall: APICALLS.crimes
},{
    title: "Oxygen Leaks",
    dataApiCall: APICALLS.oxygen_leaks
},{
    title: "Population",
    dataApiCall: APICALLS.population
},{
    title: "Medical Dispaches",
    dataApiCall: APICALLS.medical_dispaches
}];

// MAP
export function getHeatMapData(func) {
    const res = [];
    createDataHeatmap(res, 0, nextFunction);

    function nextFunction(res, i) {
        if (i + 1 < HEATMAPS.length) {
            createDataHeatmap(res, i + 1, nextFunction);
        } else {
            func(res);
        }
    }
}


function createDataHeatmap(res, i, func) {
    get(HEATMAPS[i].dataApiCall, succesHandler)

    function succesHandler(response) {
        response.json().then(data => {
            const obj = {
                title: HEATMAPS[i].title,
                data: makeDataInPosition(data[HEATMAPS[i].dataApiCall])
            }
            res.push(obj);
            func(res, i);
        })
    }
}

function makeDataInPosition(data) {
    const res = [];
    data.forEach(obj =>{
        const position = [obj.longitude, obj.latitude, 1];
        res.push(position);
    });
    return res;
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
            dataPerDome = makeDomeNameLabels(dataPerDome);
            func(dataPerDome);
        });
    }
}

function makeDomeNameLabels(data) {
    return data;
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
            let dataPerType = createLabels(data[apiCall], CATEGORYTYPES[category]);
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

function createLabels(data, key) {
    let res = {}
    data.forEach(el => {
        res[el[key]] = 0;
    });
    return res;
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



