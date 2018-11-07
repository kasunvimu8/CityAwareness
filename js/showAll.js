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


function loadAll() {
    var myLatlng = new google.maps.LatLng(7.4675, 80.6234);
    var mapOptions = {
        zoom: 7,
        center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    for (var cord in cordinates) {
        var data = cordinates[cord].split(",");
        var loc = {
            lat: data[0],
            lng: data[1]
        };

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number(data[0]), Number(data[1])),
            title: cord
        });

        marker.setMap(map);
    }



}

