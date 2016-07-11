const choo = require('choo')
const html = require('choo/html')
const gju = require('geojson-utils');
const speedyGeo = require('./speedy-geo')
const sfpdData = require('./sfpd-data')
const districtData = require('./district-data')
const sfpdGeo = require('./sfpd-simple-geo')
const districtGeo = require('./districts-simple-geo')

const app = choo()

app.model({
  state: { title: 'Not quite set yet' },
  reducers: {
    getLocation: (state) => ({foo: 'bar'}),
    update: (data, state) => ({ title: data })
  }
})

const mainView = (state, prev, send) => html`
  <main>
    <h1>Where are you?</h1>
    <button
      onclick=${(e) => send('getLocation')}>Get Your District and SFPD Info</button>
    <h2>Or choose:</h2>
    <ul>
    ${Object.keys(districtData).map(function(k) {
      return html`<li><a href="/district/${districtData[k].id}">${districtData[k].name}</a></li>`
    })}
    </ul>
    <ul>
    ${Object.keys(sfpdData).map(function(k) {
      return html`<li><a href="/sfpd/${sfpdData[k].id}">${sfpdData[k].name}</a></li>`
    })}
    </ul>
  </main>
`

const districtView = (state, prev, send) => html`hi`
const sfpdView = (state, prev, send) => html`hi`
const comboView = (state, prev, send) => html`hi`

app.router((route) => [
  route('/', mainView),
  route('/district/:district', districtView),
  route('/sfpd/:station', sfpdView),
  route('/combo/sfpd/:station/distrcit/:district', comboView),
])

const tree = app.start()
document.body.appendChild(tree)
