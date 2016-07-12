const html = require('choo/html')
const districtDetails = require('../elements/district-details')
module.exports = function (state, prev, send) {
  return html`
    <div>
      <div onload=${() => send('getDistrictData')}>
        ${districtDetails(state.districtData[state.params.district])}
      </div>
    </div>
  `
}
