const html = require('choo/html')

module.exports = function (precinct) {
  return precinct ? html`
    <div>
    <h1>${precinct.name}</h1>
    <img src="/assets/capts/${precinct.captainPic}">
    <dt>Address</dt>
    <dd>
    ${precinct.address}
    <img src="https://maps.googleapis.com/maps/api/staticmap?markers=${precinct.address}&zoom=17&size=400x300&key=AIzaSyBi3hEa4UbuqGdoMCvV6Clzo-BoVnLYuT0&scale=2">
    <img src="https://maps.googleapis.com/maps/api/streetview?size=200x150&location=${precinct.address}&key=AIzaSyBi3hEa4UbuqGdoMCvV6Clzo-BoVnLYuT0&scale=2">
    </dd>
    <dt>Twitter</dt>
    <dd>@<a href="https://twitter.com/${precinct.twitter}">${precinct.twitter}</a></dd>
    <dt>Phone</dt>
    <dd>${precinct.phone}</dd>
    <dt>Anonymous Tip Line</dt>
    <dd>${precinct.tipLine}</dd>
    <dt>Email</dt>
    <dd>${precinct.email}</dd>
    <dt>Community Meeting Time & Place</dt>
    <dd>${precinct.communityMeeting}</dd>
    </div>
  ` : ''
}
