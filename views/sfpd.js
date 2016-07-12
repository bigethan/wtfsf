const html = require('choo/html')
const sfpdDetails = require('../elements/sfpd-details')
module.exports = function (state, prev, send) {
  return html`
    <div>
      <div onload=${() => send('getSfpdData')}>
        ${sfpdDetails(state.sfpdData[state.params.precinct])}
      </div>
    </div>
  `
}
