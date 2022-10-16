
// Create the createMap function.
function createMap(earthquakeObjects) {
    let usgsMap = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
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
        zoom: 4,
        layers: [streetMap, earthquakeObjects]
    });
    // Create a baseMaps object to hold the tile layers.
    let baseMaps = {
        "Street Map": streetMap,
        "USGS Map": usgsMap, 
        "Topographic Map": topographicMap
    };
    // Create an overlayMaps object to hold the earthquakes layer.
    let overlayMaps = {
        "Earthquakes": earthquakeObjects,
    };
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // Create legend
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function (myMap) {
        let div = L.DomUtil.create('div', 'info legend'),
            depths = ["-10 to 10", "10 to 30", "30 to 50", "50 to 70", "70 to 90", "90+"];
            let depthColors = ["#feb56b","#e06c5d","#ca495c","#ac255e","#5b1061","#1f005c"]
        // loop through our depth colours and depths
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + depthColors[i] + '"></i> ' +
                depths[i] + '<br>';
        }
        return div;
    };
    legend.addTo(myMap);
};

// Create getColor function (by depth) for circle color and legend
function getColor(depth) {
    return  depth < 10 ? "#feb56b" :
            depth < 30 ? "#e06c5d" :
            depth < 50 ? "#ca495c" :
            depth < 70 ? "#ac255e" :
            depth < 90 ? "#5b1061" :
                         "#1f005c";
}

// Create the createEarthquakes function.
function createEarthquakes(response) {
    // Pull the earthquake data from response.features
    let earthquakes = response.features;
    // Initialise an array to hold the earthquake objects
    let earthquakeObjects= [];
    // let depthColors = ["#feb56b","#e06c5d","#ca495c","#ac255e","#5b1061","#1f005c"]
    // Loop through the earthquakes array
    for (let index = 0; index < earthquakes.length; index++) {
        let earthquake = earthquakes[index];
    // For each earthquake create a circle, with depthColor and variable radius
        let earthquakeLocation = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]],{
            color: "black",
            weight: 1,
            fillOpacity: 1,
            fillColor: getColor(earthquake.geometry.coordinates[2]),
            radius: earthquake.properties.mag^2 * 100000
        })
        .bindPopup("<h3>Location: " + earthquake.properties.place + "<br>Magnitude: " + earthquake.properties.mag.toFixed(1) + "</h3>")
    // Add the object to the earthquakeObjects array.    
    earthquakeObjects.push(earthquakeLocation);
    };

    // Create a layer group that's made from the earthquakeObjects array, and pass it to the createMap function.
    createMap(L.layerGroup(earthquakeObjects));
}

// Data source
earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Get GeoJSON data
d3.json(earthquakeURL).then(createEarthquakes);
