

// Creating the map object
let myMap = L.map("map", {
    center: [10, 105],
    zoom: 4
  });
  

// Create the createMap function.
function createMap() {
    let baseMap = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    });
    let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    let topographicMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    // Creating the map object
    let myMap = L.map("map", {
        center: [10, 105],
        zoom: 4
    });
}




// Data source
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Get GeoJSON data
d3.json(url).then(function(data) {
    console.log(data)
});