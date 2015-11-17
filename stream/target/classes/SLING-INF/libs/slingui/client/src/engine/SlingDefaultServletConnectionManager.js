var _ = require("lodash");
var connectionManager = require("./DefaultConnectionManager");



var SlingDefaultServletConnectionManager = {}

SlingDefaultServletConnectionManager.canHandle = function () {
    console.log("SlingDefaultServletConnectionManager canhandle");
    return false;
}

SlingDefaultServletConnectionManager.init = function () {
    console.log("SlingDefaultServletConnectionManager");
}
SlingDefaultServletConnectionManager.send = function (msg) {
    console.log("WebsocketConnectionManager");

}

SlingDefaultServletConnectionManager = _.assign(SlingDefaultServletConnectionManager, connectionManager);

console.log(SlingDefaultServletConnectionManager);


module.exports = SlingDefaultServletConnectionManager;