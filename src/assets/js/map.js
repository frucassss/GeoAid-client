    function createMap() {
        map = L.map('map', {
            maxZoom: 20,
            minZoom: 6,
            zoomControl: false
        }).setView([36, -112], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
        }).addTo(map);
        setZoomTopRight();
    }

    function setZoomTopRight() {
        L.control.zoom({
            position: 'topright'
        }).addTo(map);
    }
