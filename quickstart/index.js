var source;
var destination;
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const onButtonClick = function () {
    source = document.getElementById('input').value.toLowerCase();
    destination = document.getElementById('output').value.toLowerCase();
    if (
      source !== null &&
      source !== '' &&
      destination !== null &&
      destination !== ''
    ) {
      calculateAndDisplayRoute(directionsService);
    }
  };
  document.getElementById('route').addEventListener('click', onButtonClick);
}

function calculateAndDisplayRoute(directionsService) {
  directionsService
    .route({
      origin: {
        query: source,
      },
      destination: {
        query: destination,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      maps.zoomSettings.shouldZoomInitially = true;
      var markers = maps.layersCollection[0].markerSettings;
      markers[0].dataSource = [];
      markers[0].dataSource.push({
        latitude: response.routes[0].legs[0].start_location.lat(),
        longitude: response.routes[0].legs[0].start_location.lng(),
      });
      markers[0].dataSource.push({
        latitude: response.routes[0].legs[0].end_location.lat(),
        longitude: response.routes[0].legs[0].end_location.lng(),
      });
      var navigationlines = maps.layersCollection[0].navigationLineSettings;
      var latLngs = response.routes[0].overview_path;
      var latitudes = [];
      var longitudes = [];
      for (var i = 0; i < latLngs.length; i++) {
        latitudes.push(latLngs[i].lat());
        longitudes.push(latLngs[i].lng());
      }
      navigationlines[0].latitude = latitudes;
      navigationlines[0].longitude = longitudes;
    })
    .catch((e) => window.alert('Directions request failed due to ' + status));
}

var maps = new ej.maps.Maps({
    zoomSettings: {
        enable: true,
      },
      layers: [
        {
          urlTemplate: 'https://tile.openstreetmap.org/level/tileX/tileY.png',
          markerSettings: [
            {
              visible: true,
              shape: 'Image',
              imageUrl:
                'https://ej2.syncfusion.com/javascript/demos/src/maps/images/ballon.png',
              width: 20,
              height: 20,
            },
          ],
          navigationLineSettings: [
            {
              visible: true,
              color: 'black',
              angle: 0,
              width: 2,
            },
          ],
        },
      ]
});
maps.appendTo('#container');

window.initMap = initMap;
