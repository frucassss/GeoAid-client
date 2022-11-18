// Alle fetches enz komen hierzo
// Alles waar je aan data kan komen

export function getTotalCrime() {
    return {
        "dome 1": 80,
        "dome 2": 50,
        "dome 3": 30,
        "dome 4": 50,
    };
}

export function getTotalOxygenLeaks() {
    return {
        "dome 1": 100,
        "dome 2": 30,
        "dome 3": 90,
        "dome 4": 10,
    };
}

export function getTotalPopulation() {
    return {
        "dome 1": 60,
        "dome 2": 20,
        "dome 3": 10,
        "dome 4": 70,
    };
}

export function getTotalMedicalDispaches() {
    return {
        "dome 1": 90,
        "dome 2": 40,
        "dome 3": 5,
        "dome 4": 30,
    };
}

export function getCrimeTypes() {
    const data = {
        "Stalking": 30,
        "Arson": 5,
        "Burglary": 20,
        "Domestic abuse": 5,
        "Robbery": 10,
        "Rape": 20,
        "Terrorisme": 10
    };
    return Object.fromEntries(
        Object.entries(data).sort(([,a],[,b]) => b-a)
    );
}