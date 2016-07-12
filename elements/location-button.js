const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
    <div>
      <button
        onclick=${(e) => send('getLocation')}>
        Get Your Current District and SFPD Info
        </button>
    </div>
  `
}
