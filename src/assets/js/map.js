const MBURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const mbAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '

function createMap(position, currentPosition) {
    const southWest = L.latLng(-25, -70);
    const northEast = L.latLng(-20, -66);
    const bounds = L.latLngBounds(southWest, northEast);

    const osm = L.tileLayer(MBURL, {
        id: "map",
        attribution: mbAttr,
        maxZoom: 20
    });
    map = L.map('map', {
        maxBounds: bounds,
        maxZoom: 20,
        minZoom: 11,
        layers: [osm],
        zoomControl: false
    }).setView(position, 13);

    const baseLayers = {
        "OpenStreetMap": osm
    };
    const overlays = {};
    const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

    createDomes();
    if (currentPosition) {
        createPersonPin(layerControl, position);
    }
    createDangers(layerControl);
    setZoomTopRight();
}

function createDangers(layerControl) {
    const dangerIcon = L.icon({
        iconUrl: 'assets/media/danger.png',
        iconSize: [50, 50]
    });
    const dangerMarker = L.marker([-23.88430978488233, -69.10460472106935], { icon: dangerIcon }).bindPopup('Crime')
    const dangerLayer = L.layerGroup([dangerMarker]);
    layerControl.addOverlay(dangerLayer, 'Dangers');
}

function createPersonPin(layerControl, location) {
    const personPinIcon = L.icon({
        iconUrl: 'assets/media/person_pin.png',
        iconSize: [50, 50]
    });
    const personPinMarker = L.marker(location, { icon: personPinIcon }).bindPopup('You are here')
    const personPinLayer = L.layerGroup([personPinMarker]);
    layerControl.addOverlay(personPinLayer, 'Me');
}

function setZoomTopRight() {
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
}

function createDomes() {
    get("domes", function(response) {
        response.json().then(data => createDome(data.domes))
    })
}

function createDome(data) {
    data.forEach(dome => {
        const icon = L.icon({
            iconUrl: 'assets/media/blackdome.png',
            iconSize: [40, 40]
        });
        L.marker([dome.latitude, dome.longitude], { icon: icon }).bindPopup(`this is ${dome.domeName}`).addTo(map);
    })
}

function setView(position) {
    map.setView(position);
}

function center() {
    const coords = currentPosition.coords;
    const lat = coords.latitude - 75.5;
    const lon = coords.longitude - 73;
    map.setView([lat, lon]);
}