import {get} from "./api.js";
import {getHeatMapData} from "./datafetcher.js";
import {removeClass, removeClassAfterClick, setPosition} from "./helper.js";

const MBURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const mbAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
let map;
export const MAPBOUNDS = {
    north: -20,
    east: -66,
    south: -25,
    west: -70
}

export function createMap(position, isCurrentPosition) {
    const southWest = L.latLng(MAPBOUNDS.south, MAPBOUNDS.west);
    const northEast = L.latLng(MAPBOUNDS.north, MAPBOUNDS.east);
    const bounds = L.latLngBounds(southWest, northEast);

    const osm = L.tileLayer(MBURL, {
        id: "map",
        attribution: mbAttr,
        maxZoom: 20
    });
    map = L.map('map', {
        maxBounds: bounds,
        maxZoom: 17,
        minZoom: 9,
        layers: [osm],
        zoomControl: false
    }).setView(position, 13);

    const baseLayers = {
        "OpenStreetMap": osm
    };
    const overlays = {};
    const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

    createDomes();
    if (isCurrentPosition) {
        createPersonPin(layerControl, position);
    }
    createHeatMaps(layerControl);
    setZoomTopRight();
}

function createHeatMaps(layerControl) {
    getHeatMapData(succesHandler);

    function succesHandler(data) {
        console.log(data)
        data.forEach(heatmap => {
            const heatLayer = L.heatLayer(heatmap.data, {
                radius: 25,
                minOpacity: 0.4,
                gradient: {
                    '0.00': 'rgb(255,0,255)',
                    '0.25': 'rgb(0,0,255)',
                    '0.50': 'rgb(0,255,0)',
                    '0.75': 'rgb(255,255,0)',
                    '1.00': 'rgb(255,0,0)'
                }
            });
            layerControl.addOverlay(heatLayer, heatmap.title)
        })
    }
}

function createPersonPin(layerControl, location) {
    const personPinIcon = L.icon({
        iconUrl: 'assets/media/person_pin.png',
        iconSize: [50, 50]
    });
    const personPinMarker = L.marker(location, { icon: personPinIcon }).bindPopup('You are here' + location)
    const personPinLayer = L.layerGroup([personPinMarker]);
    layerControl.addOverlay(personPinLayer, 'Me');
}

function setZoomTopRight() {
    L.control.zoom({
        position: "topright"
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
            iconUrl: "assets/media/blackdome.png",
            iconSize: [40, 40],
            className: "dome"
        });
        L.marker([dome.latitude, dome.longitude], { icon: icon }).bindPopup(`this is ${dome.domeName}`).addTo(map);
    });
    SelectedOnClick()
}

function SelectedOnClick() {
    document.querySelectorAll(".dome").forEach(dome =>{
        dome.addEventListener("click", function (e) {
            removeClass(".selected", "selected");
            const target = e.target;
            target.classList.add("selected");
            removeClassAfterClick(".selected", "selected");
        });
    });
}

export function setView(position) {
    map.setView(position, 15);
}

export function center(currentPosition) {
    const coords = currentPosition.coords;
    const lat = coords.latitude;
    const lon = coords.longitude;
    const position = setPosition([lat, lon])
    map.setView(position);
}