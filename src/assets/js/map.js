const MBURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const mbAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '

//needs some code cleanup
function createMap(position) {
    const osm = L.tileLayer(MBURL, {
        id: "map",
        attribution: mbAttr,
        maxZoom: 20
    });

    map = L.map('map', {
        maxZoom: 20,
        minZoom: 11,
        layers: [osm],
        zoomControl: false
    }).setView(position, 13);

    const baseLayers = {
        "OpenStreetMap": osm
    };
    const overlays = {

    };
    const layerControl = L.control.layers(baseLayers, overlays).addTo(map);
    createDangerIcons(layerControl);
    setZoomTopRight();
}

function createDangerIcons(layerControl) {
    const dangerIcon = L.Icon.extend({
        options: {
            iconSize: [50, 50]
        }
    });
    const danger = new dangerIcon({ iconUrl: 'assets/media/danger.png' });
    const crime = L.marker([-23.88430978488233, -69.10460472106935], { icon: danger }).bindPopup('Crime')
    const dangers = L.layerGroup([crime]);
    layerControl.addOverlay(dangers, 'Dangers');
}

function setZoomTopRight() {
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
}

function getDomes(response) {
    response.json().then(data => createDomes(data));
}

function createDomes(data) {
    console.log(data);
    let domesArray = [];
    for (domes in data.domes) {
        domesArray.push(data.domes[domes]);
    }
    domesArray.forEach(dome => {
        console.log("============================");
        console.log(`creating dome ${dome.domeName} at ${dome.latitude}, ${dome.longitude} with id ${dome.id}`);
        createDome(dome);
        console.log("dome created");
    });
}

function createDome(dome) {
    L.marker([dome.latitude, dome.longitude], { icon: domeIcon }).bindPopup(`this is ${dome.domeName}`).addTo(map);
}

function createDomeIcons() {
    domeIcon = L.icon({
        iconUrl: 'assets/media/blackdome.png',
        iconSize: [40, 40]
    });
}