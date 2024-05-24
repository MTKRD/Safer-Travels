// function initializeMap() {
//     var map = tt.map({
//         key: "xfbbhehRbP7NMrCMLosZ8wBT5eZvEgqa",
//         container: "map"
//     });
// }

// document.addEventListener("DOMContentLoaded", function() {
//     initializeMap();

//     function locatePlace() {
//         var map = tt.map({
//             key: "xfbbhehRbP7NMrCMLosZ8wBT5eZvEgqa",
//             container: "map"
//         });

//         var zipCode = document.getElementById("zip-code").value;
//         var searchQuery = {
//             query: zipCode,
//             limit: 1,
//             countrySet: "US",
//             language: "en-US"
//         };

//         tt.services.fuzzySearch(searchQuery).go()
//             .then(function(response) {
//                 var results = response.results;
//                 if (results && results.length > 0) {
//                     var location = results[0].position;
//                     map.flyTo({ center: location, zoom: 12 });
//                 } else {
//                     alert("Location not found. Please try again.");
//                 }
//             })
//             .catch(function(error) {
//                 console.error("Error searching for location:", error);
//             });
//     }

//     var submitButton = document.getElementById("submit");
//     submitButton.addEventListener("click", function(event) {
//         event.preventDefault();
//         locatePlace();
//     });
// });

function initializeMap() {
    var map = tt.map({
        key: "xfbbhehRbP7NMrCMLosZ8wBT5eZvEgqa",
        container: "map"
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initializeMap();

    function locatePlace() {
        var map = tt.map({
            key: "xfbbhehRbP7NMrCMLosZ8wBT5eZvEgqa",
            container: "map"
        });

        var zipCode = document.getElementById("zip-code").value;
        var searchQuery = {
            query: zipCode,
            limit: 1,
            countrySet: "US",
            language: "en-US"
        };

        if (tt.services) {
            tt.services.fuzzySearch(searchQuery).go()
                .then(function(response) {
                    var results = response.results;
                    if (results && results.length > 0) {
                        var location = results[0].position;
                        map.flyTo({ center: location, zoom: 12 });
                    } else {
                        alert("Location not found. Please try again.");
                    }
                })
                .catch(function(error) {
                    console.error("Error searching for location:", error);
                });
        } else {
            console.error("tt.services is not available. Make sure the TomTom Maps SDK is loaded correctly.");
        }
    }

    var submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        locatePlace();
    });
});