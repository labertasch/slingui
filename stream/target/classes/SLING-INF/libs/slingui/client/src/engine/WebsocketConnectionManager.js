var _ = require("lodash");
var connectionManager = require("./DefaultConnectionManager");

var WebsocketConnectionManager = {}


WebsocketConnectionManager.canHandle = function () {
    console.log("websock m");
    return false;
}

WebsocketConnectionManager.init = function () {
    console.log("WebsocketConnectionManager ");
}
WebsocketConnectionManager.send = function (msg) {
    console.log("WebsocketConnectionManager");

}

WebsocketConnectionManager = _.assign(WebsocketConnectionManager, connectionManager);

console.log(WebsocketConnectionManager);


module.exports = WebsocketConnectionManager;