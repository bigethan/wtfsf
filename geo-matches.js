const gju = require('geojson-utils');
const speedyGeo = require('./geojson/speedy-geo')
const sfpdGeo = require('./geojson/sfpd-simple-geo')
const districtGeo = require('./geojson/districts-simple-geo')

module.exports = function (lat, long) {
  var precinct = getPoly(lat, long, speedyGeo.sfpd, sfpdGeo)
  var district = getPoly(lat, long, speedyGeo.districts, districtGeo)
  return { precinct, district }
}


function getPoly(lat, long, speedy, fullFile, callback) {
  var req
  var polyName
  speedy.forEach(function(f) {
    var inBox = gju.pointInBoundingBox({'coordinates':[long, lat]}, f.box)
    boxMatch += inBox ? 1 : 0
    polyId = f.id
  })

  if (boxMatch == 1) {
    return polyId;
  } else {
    console.log('full search')
    for(var i = 0; i < fullFile.features.length; i++) {
      var inPoly = gju.pointInPolygon({
        "type":"Point",
        "coordinates":[long, lat]},
        {
          "type":"Polygon",
          "coordinates": fullFile.features[i].geometry.coordinates[0],
        }
      )
      if (inPoly) {
        return f.id;
      }
    }
  }
}
