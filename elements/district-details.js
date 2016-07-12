const html = require('choo/html')

module.exports = function (district) {
  return district ? html`
    <div>
    <h1>${district.name}</h1>
    <img src="/assets/supes/${district.supePhoto}">
    <dt>Supervisor</dt>
    <dd>${district.supeName}</dd>
    <dt>Twitter</dt>
    <dd>@<a href="https://twitter.com/${district.supeTwitter}">${district.supeTwitter}</a></dd>
    <dt>Phone</dt>
    <dd>${district.supePhone}</dd>
    <dt>Email</dt>
    <dd>${district.supeEmail}</dd>
    </div>
  ` : ''
}
