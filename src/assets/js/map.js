    //common consts
    const mbUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const mbAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
   
    //needs some code cleanup
   function createMap() {
    //icons
    const domeIcon = L.Icon.extend({
        options: {
            iconSize: [40, 40]
        }
    });
    const dangerIcon = L.Icon.extend({
        options: {
            iconSize: [50, 50]
        }
    });
    
    const blackdome = new domeIcon({iconUrl: 'assets/images/blackdome.png'});
    const danger = new dangerIcon({iconUrl: 'assets/images/danger.png'});
    //domes marker
    const domes = L.layerGroup();
    const dome1 = L.marker([36, -110.5], {icon: blackdome}).bindPopup('This is Dome1').addTo(domes);
    const dome2 = L.marker([38.74, -104], {icon: blackdome}).bindPopup('This is Dome2.').addTo(domes);

    const osm = L.tileLayer(mbUrl, {
        attribution: mbAttr
    });
 
    map = L.map('map', {
        maxZoom: 20,
        minZoom: 6,
        layers: [osm, domes],
        zoomControl: false
    }).setView([36, -112], 13);
    const baseLayers = {
        "OpenStreetMap": osm
    };
    const overlays = {
        "Domes": domes
    };
    const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

        //dangers
        const crime = L.marker([40.74, -120], {icon: danger}).bindPopup('Crime')

        const dangers = L.layerGroup([crime]);
        layerControl.addOverlay(dangers, 'Dangers');
    setZoomTopRight();
    }

    function setZoomTopRight() {
        L.control.zoom({
            position: 'topright'
        }).addTo(map);
    }

    