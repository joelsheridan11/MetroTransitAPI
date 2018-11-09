$(document).ready(function() {

    // Generate dropdown list from JSON from providers API
    let dropdown = document.getElementById('providerDropdown');
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Provider';
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'http://svc.metrotransit.org/NexTrip/Providers?format=json';

    fetch(url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Error Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function(data) {
                    let option;

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].Text;
                        option.value = data[i].Value;
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch(function(err) {
            console.error('Fetch Error -', err);
        })

    //Generate dropdown list for routes from API JSON
    let routeDropdown = document.getElementById('routeDropdown');
    routeDropdown.length = 0;
    let routeDefaultOption = document.createElement('option');
    routeDefaultOption.text = 'Choose Route';
    routeDropdown.add(routeDefaultOption);
    routeDropdown.selectedIndex = 0;

    const routeUrl = 'http://svc.metrotransit.org/NexTrip/Routes?format=json';

    fetch(routeUrl)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Error Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function(data) {
                    let option;

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].Description;
                        option.value = data[i].ProviderID;
                        //option.value = data[i].Value;
                        routeDropdown.add(option);
                    }
                });
            }
        )
        .catch(function(err) {
            console.error('Fetch Error -', err);
        })



});


//create dependency for route dropdown from provider dropdown value
$("#routeDropdown").val([]);
$('#routeDropdown option').hide();

$("#providerDropdown").on("change", function() {
    $('#routeDropdown option')
        .hide() // hide all
        .filter('[value^="' + $(this).val() + '"]') // filter options with required value
        .show(); // and show them

    $("#routeDropdown").val([]);
})


//gathers value from provider dropdown
function getproviderDropdown(selectObject) {
    var providers = document.getElementById("providerDropdown");
    var providerValue = providers.options[providers.selectedIndex].value;

}
//gathers value of route dropdown
function getrouteDropdown(selectedObject) {

    var routes = document.getElementById("routeDropdown");
    var routeValue = routes.options[routes.selectedIndex].value;

}
//gathers value of direction dropdown selection
function getdirectionsDropdown() {
    var directions = document.getElementById("directionsDropdown");
    var directionValue = directions.options[directions.selectedIndex].value;

}


//gathers value of stops dropdown selection
function getStopsDropdown() {
    var stops = document.getElementById("stopsDropdown");
    var stopsValue = stops.options[stops.selectedIndex].value;
}

//listening buttons for testing api data values
//document.getElementById('getProviders').addEventListener('click', getProviders);
//document.getElementById('getRoutes').addEventListener('click', getRoutes);
//document.getElementById('getDirections').addEventListener('click', getDirections);
//document.getElementById('getStops').addEventListener('click', getStops);



//Testing code forgathering providers
/* function getProviders() {
    fetch('http://svc.metrotransit.org/NexTrip/Providers?format=json')
        .then((res) => res.json())
        .then((data) => {
            let output = '<h2 class="mb-4">Providers</h2>';
            data.forEach(function(post) {
                output += `
         <div class="card card-body mb-3">
           <h3>${post.Value}</h3>
           <p>${post.Text}</p>
         </div>
       `;
            });
            document.getElementById('output').innerHTML = output;
        })
}

//testing code for gathering routes
function getRoutes() {
    fetch('http://svc.metrotransit.org/NexTrip/Routes?format=json')
        .then((res) => res.json())
        .then((data) => {
            let routeOutput = '<h2 class="mb-4">Routes</h2>';
            data.forEach(function(post) {
                routeOutput += `
         <div class="card card-body mb-3">
           <h3>${post.Description}</h3>
           <p>${post.ProviderID}</p>
           <p>${post.Route}</p>
         </div>
       `;
            });
            document.getElementById('routeOutput').innerHTML = routeOutput;
        })


} */

/* function getProviderSelection() {
    var selectedValue = document.getElementById('providerDropdown').value;
    console.log(selectedValue);
} */
//testing code for gathering directions
/* function getDirections(route_id) {
    // Get Direction
    //const url = `http://svc.metrotransit.org/NexTrip/Directions/${route_id}?format=json`;
    //var route_id = 3
    var route_id = route_id
    const url = `http://svc.metrotransit.org/NexTrip/Directions/${route_id}?format=json`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let directionOutput = '<h2 class="mb-4">Directions</h2>';
            data.forEach(function(post) {
                directionOutput += `
     <div class="card card-body mb-3">
       <h3>${post.Value}</h3>
       <p>${post.Text}</p>
     
     </div>
   `;
            });
            document.getElementById('directionOutput').innerHTML = directionOutput;
        })


} */
//create direction dropdown
function createDirectionDropdown(route_id) {

    let directionsDropdown = document.getElementById('directionsDropdown');
    directionsDropdown.length = 0;
    let directionsDefaultOption = document.createElement('option');
    directionsDefaultOption.text = 'Choose Direction';
    directionsDropdown.add(directionsDefaultOption);
    directionsDropdown.selectedIndex = 0;
    var route = route_id
    const directionUrl = `http://svc.metrotransit.org/NexTrip/Directions/${route}?format=json`;

    fetch(directionUrl)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Error Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function(data) {
                    let option;
                    //catch if no options exsist 
                    if (data.length == 0) {
                        directionsDefaultOption.text = 'No new Departures';

                    } else {
                        for (let i = 0; i < data.length; i++) {

                            //option.text = data[i].text;
                            option = document.createElement('option');
                            option.text = data[i].Text;
                            option.value = data[i].Value;
                            directionsDropdown.add(option);
                        }

                        //alert(option)
                    }
                });
            }
        )
        .catch(function(err) {
            console.error('Fetch Error -', err);
        })
}
//testing code for gathering stops
/* function getStops() {
    // Get Direction - used this for testing
    //const url = `http://svc.metrotransit.org/NexTrip/Directions/${route_id}?format=json`;
    //var route_id = 3
    var routes = document.getElementById("routeDropdown");
    var route_id = routes.options[routes.selectedIndex].value;
    var directions = document.getElementById("directionsDropdown");
    var direction = directions.options[directions.selectedIndex].value;
    const url = `http://svc.metrotransit.org/NexTrip/Stops/${route_id}/${direction}?format=json`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let stopsOutput = '<h2 class="mb-4">Stops</h2>';
            data.forEach(function(post) {
                stopsOutput += `
 <div class="card card-body mb-3">
   <h3>${post.Value}</h3>
   <p>${post.Text}</p>
 
 </div>
`;
            });
            document.getElementById('stopsOutput').innerHTML = stopsOutput;
        })


} */

//creates stops dropdown by grabbing values from routes and directions dropdown
function createStopsDropdown() {

    let stopsDropdown = document.getElementById('stopsDropdown');
    stopsDropdown.length = 0;
    let stopsDefaultOption = document.createElement('option');
    stopsDefaultOption.text = 'Choose Stops';
    stopsDropdown.add(stopsDefaultOption);
    stopsDropdown.selectedIndex = 0;
    var routes = document.getElementById("routeDropdown");
    var route_id = routes.options[routes.selectedIndex].value;
    var directions = document.getElementById("directionsDropdown");
    var direction = directions.options[directions.selectedIndex].value;
    const Url = `http://svc.metrotransit.org/NexTrip/Stops/${route_id}/${direction}?format=json`;

    fetch(Url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Error Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function(data) {
                    let option;
                    if (data.length == 0) {
                        stopsDefaultOption.text = 'No new Departures';

                    } else {

                        for (let i = 0; i < data.length; i++) {
                            option = document.createElement('option');
                            //option.text = data[i].text;
                            option.text = data[i].Text;
                            option.value = data[i].Value;
                            stopsDropdown.add(option);
                            //alert(option)
                        }
                    }
                });
            }
        )
        .catch(function(err) {
            console.error('Fetch Error -', err);
        })
}

// click event for search button that creates datatable based on drop down optiosn selected. Passes route, directio and stop values
$(document).on('click', '#searchBtn', function() {
    //remove all data in table except the header
    $('#bustTableBody').find("tr:not(:first)").remove();

    var routes = document.getElementById("routeDropdown");
    var route_id = routes.options[routes.selectedIndex].value;
    var directions = document.getElementById("directionsDropdown");
    var direction = directions.options[directions.selectedIndex].value;
    var stops = document.getElementById("stopsDropdown");
    var stop_id = stops.options[stops.selectedIndex].value;
    var reportName = 'Bus Reports';
    const stopUrl = `http://svc.metrotransit.org/NexTrip/${route_id}/${direction}/${stop_id}?format=json`;

    fetch(stopUrl)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Error Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function(data) {


                    var tr;
                    for (var i = 0; i < data.length; i++) {

                        var DepartureTimeConvert = parseJsonDate(data[i].DepartureTime);
                        //var latitudeIntConver = parseJsonInt(data[i].VehicleLatitude);
                        tr = $('<tr/>');
                        tr.append("<td>" + data[i].DepartureText + "</td>");
                        tr.append("<td>" + DepartureTimeConvert + "</td>");
                        tr.append("<td>" + data[i].Description + "</td>");
                        tr.append("<td>" + data[i].Gate + "</td>");
                        tr.append("<td>" + data[i].Route + "</td>");
                        tr.append("<td>" + data[i].RouteDirection + "</td>");
                        tr.append("<td>" + data[i].Terminal + "</td>");
                        tr.append("<td>" + data[i].VehicleLatitude + "</td>");
                        tr.append("<td>" + data[i].VehicleLongitude + "</td>");
                        tr.append("<td><button id=googlebtn class=btn btn-link>Bus Location</button></td>");
                        $('#busTable').append(tr);
                        showTableDiv();
                        showButtonsDiv();
                    }

                });
            }
        )
        .catch(function(err) {
            console.error('Fetch Error -', err);
            alert(err);
        })

});

// convert date string from JSON to datetime format - gets called in searchbutton click event
function parseJsonDate(jsonDateString) {
    return new Date(parseInt(jsonDateString.replace('/Date(', '')));
}



//show functions that remove hidden class on dropdowns - ensures end users are selecting all required fields
function showDirectionsDiv() {

    document.getElementById("directionsDiv").className = "";
    $('#bustTableBody').find("tr:not(:first)").remove();
}

function showRoutesDiv() {

    document.getElementById("routesDiv").className = "";
}

function showStopsDiv() {

    document.getElementById("stopsDiv").className = "";
}

function showButtonDiv() {

    document.getElementById("buttonDiv").className = "";
}

function showButtonsDiv() {

    document.getElementById("buttonsDiv").className = "";
}

function showTableDiv() {

    document.getElementById("tableDiv").className = "";
}

//clear data table  - called when dropdowns are changed
function clearDatatable() {

    $('#bustTableBody').find("tr:not(:first)").remove();
}



//function for google maps button on each row
$(document).on('click', '#googlebtn', function() {

    var tr = $(this).closest('tr');
    var lat = tr.children('td:eq(7)').text();
    var pr = $(this).closest('tr');
    var long = pr.children('td:eq(8)').text();
    // alert(long);
    //const googleURL = `https://www.google.com/maps/?q=${lat},${long}`;
    const googleDirectionsURL = `http://maps.google.com/maps?saddr=Current+Location&daddr=${lat},${long}`;
    const googlecurrentDirectionURL = `http://maps.google.com/maps?saddr=${lat},${long}&daddr=Current+Location`;
    var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,width=600,height=300,left=100,top=100";
    window.open(googlecurrentDirectionURL, strWindowFeatures);

});