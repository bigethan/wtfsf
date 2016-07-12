const html = require('choo/html')
const locationButton = require('../elements/location-button')
module.exports = function (state, prev, send) {
  return html`
    <div>
      ${locationButton(state, prev, send)}
      <h2>Or choose:</h2>
      <ul onload=${() => send('getDistrictData')}>
      ${Object.keys(state.districtData).map(function(k) {
        return html`<li><a href="/district/${k}">${state.districtData[k].name}</a></li>`
      })}
      </ul>
      pd:
      <ul onload=${() => send('getSfpdData')}>
      ${Object.keys(state.sfpdData).map(function(k) {
        return html`<li><a href="/sfpd/${k}">${state.sfpdData[k].name}</a></li>`
      })}
      </ul>
    </div>
  `
}
