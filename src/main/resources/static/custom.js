var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: parseFloat(busLocations[0].LATITUDE),
      lng: parseFloat(busLocations[0].LONGITUDE),
    },
    zoom: 15,
    scrollwheel: false,
  });
  infoWindow = new google.maps.InfoWindow();

  for (i = 0; i < busLocations.length; i++) {
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(busLocations[i].LATITUDE),
        lng: parseFloat(busLocations[i].LONGITUDE),
      },
      map: map,
    });
    // makeInfoWindowEvent(map, infowindow, "test" + i, marker);

    // markers.push(marker);
  }
}

// function makeInfoWindowEvent(map, infowindow, contentString, marker) {
//   google.maps.event.addListener(marker, "click", function () {
//     infowindow.setContent(contentString);
//     infowindow.open(map, marker);
//   });
// }

// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent("You are here.");
      infoWindow.open(map);
      map.setCenter(pos);
    },
    function () {
      handleLocationError(true, infoWindow, map.getCenter());
    }
  );
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
