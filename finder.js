var gju = require('geojson-utils');
var places = require('places.js')
var speedyGeo = require('./speedy-geo')
var sfpd = require('./sfpd')
var districts = require('./districts')

function showUI() {
  document.getElementsByClassName('loading')[0].style.opacity = '0'
  document.getElementsByClassName('ui')[0].style.opacity = '1'
}

function showData(sfpdId, districtId) {
  var spfpd = sfpd[sfpdId]
  var district = districts[districtId]
  console.log(sfpd)
  console.log(district)
  //manage view stuff
}

var placesAutocomplete = places({
  container: document.getElementById('address')
});

placesAutocomplete.on('change', function(e) {
  buisinessTime(e.suggestion.latlng.lat, e.suggestion.latlng.lng)
});

function getPoly(lat, long, speedy, fullFile, callback) {
  var req
  var polyName
  speedy.forEach(function(f) {
    var inBox = gju.pointInBoundingBox({'coordinates':[long, lat]}, f.box)
    boxMatch += inBox ? 1 : 0
    polyId = f.id
  })

  if (boxMatch == 1) {
    callback(polyId)
  } else {
    console.log('full search')
    function reqListener(e) {
      data = JSON.parse(this.responseText)
      data.features.forEach(function (f) {
        var inPoly = gju.pointInPolygon({
          "type":"Point",
          "coordinates":[long, lat]},
          {
            "type":"Polygon",
            "coordinates": f.geometry.coordinates[0],
          }
        )
        if (inPoly) {
          callback(f.id)
          break
        }
      })
    }
    req = new XMLHttpRequest();
    req.onload = reqListener;
    req.open("get", fullFile, true);
    req.send();
  }
}

function getSfpd(lat, long, callback) {
  var precinct = getPoly(lat, long, speedyGeo.sfpd, 'sfpd-simple.geojson', callback)
}

function getDistrict(lat, long, callback) {
  var district = getPoly(lat, long, speedyGeo.districts, 'districts-simple.geojson', callback)
}

function buisinessTime(lat, long) {
  getSfpd(lat, long, function(sfpdId) {
    getDistrict(lat, long, function(districtId) {
      showData(sfpdId, districtId)
    })
  });

}

showUI();
