var gju = require('./geo-util')
var places = require('places.js')

var supesData;
var oReq = new XMLHttpRequest();

oReq.onload = reqListener;
oReq.open("get", "districts.geojson", true);
oReq.send();

function reqListener(e) {
  supesData = JSON.parse(this.responseText);
  showUI()
}

function showUI() {
  document.getElementsByClassName('loading')[0].style.opacity = '0'
  document.getElementsByClassName('ui')[0].style.opacity = '1'
}

var placesAutocomplete = places({
  container: document.getElementById('address')
});

placesAutocomplete.on('change', function(e) {
  buisinessTime(e.sugestion.latlng)
});
