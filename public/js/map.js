mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsLWdwIiwiYSI6ImNrcXRmNXliYzA3bTIycHA4c2pycjNyeXQifQ.mTaMRpxwC6qtPk1-VefRJQ';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/daniel-gp/ckqtg9brz5axa18qs0ic1dhdo',
    center: [4.48, 50.84],
    zoom: 9,
    localFontFamily: "Rubik"
});

let marker = new mapboxgl.Marker({
        color: "#000000",
        draggable: false,
        element: document.querySelector(".map__marker"),
    }).setLngLat([4.48, 50.84])
    .addTo(map)

// setTimeout(() => {
//     map.flyTo({
//         center: [0, 0],
//         speed: 1.5,
//         curve: 1.5
//     })
// }, 5000);