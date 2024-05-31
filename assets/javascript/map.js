// https://api.tomtom.com/map/1/tile/basic/main/0/0/0.png?view=Unified&key=xfbbhehRbP7NMrCMLosZ8wBT5eZvEgqa
//tomtom api with (what should be) an activated key 

// in this part of the code we have our API key and things like how zoomed in it is by default
const mapInput = document.querySelector(".tt-search-box-input");
var apiKey = "xfbbhehRbP7NMrCMLosZ8wBT5eZvEgqa";
var centerCoords = [4.89218, 52.37187];
var initialZoom = 13;
var map = tt.map({
    key: apiKey,
    container: "map",
    center: centerCoords,
    zoom: initialZoom
});

// here we are declaring variables from how the searches to work to where we know how the user wants to see the traffic flow or not.
var searchBoxInstance;
var startCornerLngLat;
var endCornerLngLat;
var mousePressed;
var layerFillID = "layerFillID";
var layerOutlineID = "layerOutlineID";
var sourceID = "sourceID";
var styleBase = "tomtom://vector/1/";
var styleS1 = "s1";
var styleRelative = "relative";
var refreshTimeInMillis = 30000;
var popupHideDelayInMilis = 4000;
var trafficFlowTilesToggle = document.getElementById("flow-toggle");


var trafficFlowTilesTier = new tt.TrafficFlowTilesTier({
    key: apiKey,
    style: styleBase + styleRelative,
    refresh: refreshTimeInMillis
});

var commonSearchBoxOptions = {
    key: apiKey,
    center: map.getCenter()
};

// using this to help identify like if its bad or not  and to remove it all together if they uncheck the box
function toggleTrafficFlowTilesTier() {
    if (trafficFlowTilesToggle.checked) {
        map.addTier(trafficFlowTilesTier);
    } else {
        map.removeTier(trafficFlowTilesTier.getId());
        console.log("i hate traffic");
    }
}

// the following 2 functions are search related the first grabs names to make searches accurate and helps
// like fill in / guess what you might type next.  
function updateSearchBoxOptions() {
    var updatedOptions = Object.assign(commonSearchBoxOptions, {
        center: map.getCenter()
    });
    searchBoxInstance.updateOptions({
        minNumberOfCharacters: 0,
        searchOptions: updatedOptions,
        autocompleteOptions: updatedOptions
    });
}
 // this piece of the function grabs your final search / result, locates it then the speed number
 // will manipulate how fast the map flys to where you searched.
function onSearchBoxResult(result) {
    console.log(result);
    map.flyTo({
        center: result.data.result.position,
        speed: 3

    });
   
    let lat = result.data.result.position.lat;
    let lon= result.data.result.position.lng;
    
    localStorage.setItem("lat",lat);
    localStorage.setItem("lon",lon);
}


let drawBoundingBoxButtonPressed = false;

function onMouseDown(eventDetails) {
    if (drawBoundingBoxButtonPressed) {
        eventDetails.preventDefault();
        mousePressed = true;
        startCornerLngLat = eventDetails.lngLat;
        removeBoundingBox();
        map.addSource(sourceID, getPolygonSource(startCornerLngLat, startCornerLngLat));
        map.addLayer({
            id: layerFillID,
            type: "fill",
            source: sourceID,
            layout: {},
            paint: {
                "fill-color": "#666",
                "fill-opacity": 0.1
            }
        });
        map.addLayer({
            id: layerOutlineID,
            type: "line",
            source: sourceID,
            layout: {},
            paint: {
                "line-width": 4,
                "line-color": "#424242",
                "line-dasharray": [2, 1],
                "line-blur": 0.5
            }
        });
    }
}

// these 2 fC's  deal with being able to move the map with your mouse. 
function onMouseMove(eventDetails) {
    if (mousePressed) {
        endCornerLngLat = eventDetails.lngLat;
        updateRectangleData(startCornerLngLat, endCornerLngLat);
    }
}

function onMouseUp(eventDetails) {
    mousePressed = false;
    hidePopup(0);
    if (drawBoundingBoxButtonPressed) {
        endCornerLngLat = eventDetails.lngLat;
        if (bothLngLatAreDifferent(startCornerLngLat, endCornerLngLat)) {
            updateRectangleData(startCornerLngLat, endCornerLngLat);
            clearIncidentList();
            displayTrafficIncidents(getLngLatBoundsForIncidentDetailsCall(startCornerLngLat, endCornerLngLat));
            showTrafficIncidentsTier();
        } else {
            showErrorPopup("Try to select bigger bounding box.");
            hidePopup(popupHideDelayInMilis);
        }
    }
}

function getPolygonSourceData(startCornerLngLat, endCornerLngLat) {
    return {
        type: "Feature",
        geometry: {
            type: "Polygon",
            coordinates: [
                [
                    [startCornerLngLat.lng, startCornerLngLat.lat],
                    [startCornerLngLat.lng, endCornerLngLat.lat],
                    [endCornerLngLat.lng, endCornerLngLat.lat],
                    [endCornerLngLat.lng, startCornerLngLat.lat],
                    [startCornerLngLat.lng, startCornerLngLat.lat]
                ]
            ]
        }
    };
}

function getPolygonSource(startCornerLngLat, endCornerLngLat) {
    return {
        type: "geojson",
        data: getPolygonSourceData(startCornerLngLat, endCornerLngLat)
    };
}
// here down is just calling the functions so they can activate and getting the searchbox plug in which allows us to have those pre-filled suggestions 
function initApplication() {
    searchBoxInstance = new tt.plugins.SearchBox(tt.services, {
        minNumberOfCharacters: 0,
        labels: {
            placeholder: "Where are you traveling too?"
        },
        noResultsMessage: "No results found.",
        searchOptions: commonSearchBoxOptions,
        autocompleteOptions: commonSearchBoxOptions

        
    });

    

    searchBoxInstance.on("tomtom.searchbox.resultselected", onSearchBoxResult);

    document.getElementById("search-panel").append(searchBoxInstance.getSearchBoxHTML());
    trafficFlowTilesToggle.addEventListener("change", toggleTrafficFlowTilesTier);
    map.on("mousedown", onMouseDown);
    map.on("mouseup", onMouseUp);
    map.on("mousemove", onMouseMove);
    map.on("moveend", updateSearchBoxOptions);
    console.log("safe travels!");
   
        
}

initApplication();
