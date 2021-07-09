mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsLWdwIiwiYSI6ImNrcXRmNXliYzA3bTIycHA4c2pycjNyeXQifQ.mTaMRpxwC6qtPk1-VefRJQ';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/daniel-gp/ckqtg9brz5axa18qs0ic1dhdo',
    center: [0, 0],
    zoom: 10,
    localFontFamily: "Rubik"
});

let marker = new mapboxgl.Marker({
        color: "#000000",
        draggable: false,
        element: document.querySelector(".map__marker"),
    }).setLngLat([0, 0])
    .addTo(map)