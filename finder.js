var gju = require('geojson-utils');
var places = require('places.js')
var bboxes = require('./boundingboxes')

var supesData;
var oReq = new XMLHttpRequest();

oReq.onload = reqListener;
oReq.open("get", "districts.geojson", true);
oReq.send();

var sfpdReq = new XMLHttpRequest();

sfpdReq.onload = sfpdReqListener;
sfpdReq.open("get", "sfpd.geojson", true);
sfpdReq.send();

function reqListener(e) {
  supesData = JSON.parse(this.responseText);
  showUI()
}

function sfpdReqListener(e) {
  sfpdData = JSON.parse(this.responseText);
}

function showUI() {
  document.getElementsByClassName('loading')[0].style.opacity = '0'
  document.getElementsByClassName('ui')[0].style.opacity = '1'
}

var placesAutocomplete = places({
  container: document.getElementById('address')
});

placesAutocomplete.on('change', function(e) {
  console.log(e);
  buisinessTime(e.suggestion.latlng.lat, e.suggestion.latlng.lng)
});

function buisinessTime(lat, long) {
  supesData.features.forEach(function (f) {
    console.log(f.properties);
    var inDistrict = gju.pointInPolygon({
      "type":"Point",
      "coordinates":[long, lat]},
      {
        "type":"Polygon",
        "coordinates": f.geometry.coordinates[0],
      }
    )
    console.log(inDistrict ? f.properties.supdist : 'nope')
  })
  sfpdData.features.forEach(function (f) {
    console.log(f.properties);
    var inPrecinct = gju.pointInPolygon({
      "type":"Point",
      "coordinates":[long, lat]},
      {
        "type":"Polygon",
        "coordinates": f.geometry.coordinates[0],
      }
    )
    console.log(inPrecinct ? f.properties.DISTRICT : 'nope')
  })
}
