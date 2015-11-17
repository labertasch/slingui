var http = require("http");
var _ = require("lodash");
var ws = require("ws");
var util = require("util");
var EventEmitter = require('events').EventEmitter;

var DefaultConnectionManager = require("./engine/DefaultConnectionManager");
var HttpResolver = require("./engine/HttpResolver");
var WebsocketResolver = require("./engine/WebsocketResolver");
var url = require("./utils/URL");
var SlingUI = require("./SlingUI");

DefaultConnectionManager
    .use(WebsocketResolver)
    .use(HttpResolver);

global.SlingUI = SlingUI;
global.SlingUI.URL = url;
global.SlingUI.CM = DefaultConnectionManager;
