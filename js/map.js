var cordinates={

    "Colombo" :"6.9271,79.8612",
    "Kandy" : "7.291418, 80.636696",
    "Hambantota":"6.124593, 81.101074",
    "Galle" :"6.053519, 80.220978",
    "Matara":"6.166666, 80.499998",
    "Rathnapura":"6.583331, 80.583331",
    "Anuradhapura":"8.333332, 80.499998",
    "Kurunegala" :"7.4863 ,80.3623",
    "Jaffna" :"9.75 ,80.08333 ",
    "Puttalam":"8.0362 ,79.8283",
    "Nuwara Eliya":"6.97078 ,80.78286",
    "Kaluthara": "6.583331, 80.166666",
    "Monaragala":"6.7563, 81.2519",
    "Badulla" :"6.9895, 81.0557",
    "Mannar" :"8.9666628 ,79.8833298",
    "Matale" :"7.4675, 80.6234",
    "Kegalle" :"7.2513, 80.3464",
    "Gampaha":"7.0873, 80.0144"

}

function callMap(city) {

    var input = cordinates[city];
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: latlng
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    geocodeLatLng(geocoder, map, infowindow,input);

}


function geocodeLatLng(geocoder, map, infowindow,cordinateString) {
    var latlngStr = cordinateString.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}