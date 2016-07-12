const choo = require('choo')
const html = require('choo/html')
const xhr = require('choo/http')
const extend = require('xtend')
const getGeoMatches = require('./geo-matches')
// const sfpdData = require('./sfpd-data')
// const districtData = require('./district-data')



const app = choo()

app.model({
  state: {
    districtData: {},
    sfpdData: {},
  },
  reducers: {
    gotDistrictData: (data, state) => {
      return extend(state, { districtData: data })
    },
    gotSfpdData: (data, state) => {
      return extend(state, { sfpdData: data })
    },
    gotLocation: (href, state) => {
      send('location:setLocation', { location: href })
    },
  },
  effects: {
    getLocation: (state, send, done) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const geos = getGeoMatches(position.coords)
        const href = `/district/${geos.district}/sfpd/${geos.sfpd}`
        send('gotLocation', href, done)
      }, () => {console.log('you so private')})
    },
    getDistrictData: (data, state, send, done) => {
      xhr.get({url: '/data/district.json', json: true}, function (err, resp) {
        send('gotDistrictData', resp.body, done)
      })
    },
    getSfpdData: (data, state, send, done) => {
      xhr.get({url: '/data/sfpd.json', json: true}, function (err, resp) {
        send('gotSfpdData', resp.body, done)
      })
    }
  }
})


const comboView = (state, prev, send) => html`<main>hicom</main>`

app.router((route) => [
  route('/', require('./views/index')),
  route('/district/:district', require('./views/district')),
  route('/sfpd/:precinct', require('./views/sfpd')),
  route('/combo/sfpd/:precinct/distrcit/:district', comboView),
])

const tree = app.start()
document.body.appendChild(tree)
