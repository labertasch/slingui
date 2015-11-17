var http = require('http');
var ws = require("ws");
var _ = require("lodash");
var URL = require("../utils/URL");




var WebsocketResolver = {
         canHandle: function () {
             console.log("websocket resolver canhandle function");
             return true;
         },
         init: function () {
             var self = this;
             if(!self.websocket) {
                 console.log("creating websocket")
                 self.websocket = new ws(self.SlingServer);
             }

             self.websocket.onopen = self.webSocketOnOpen;

             /*function(evt) {
                 self.emitEvent("open", evt);
                 self.connected = true;
             };*/

             self.websocket.onclose = self.webSocketOnClose; /*function(evt) {
                 self.emitEvent("close", evt);
                 self.connected = false;
                 self.init(self.SlingServer);
             };*/


             self.websocket.onmessage = self.webSocketOnMessage;/*function(evt) {
                 self.emitEvent("message", JSON.parse(evt.data));
             };*/

             self.websocket.onerror = self.webSocketOnError; /*function(evt) {
                 self.emitEvent("error", evt);
                 self.connected = false;
             };*/
         },

         webSocketOnOpen: function (event) {
           var self = this;
           console.log("websocket opened");
           self.emitEvent("open", event);
           self.connected = true;

         },

         webSocketOnClose: function (event) {
           console.log("websocket closed");

         },

         webSocketOnMessage: function (event) {
           console.log("some event from smewher");
           //self.emitEvent("Message", event);

           //var eventData = {"path": path, "type" : "request", "parent" : URL.getRelativeParent(path, 1)};
           //data = _.assign(eventData, JSON.parse(data));
           //console.log(event);


         },
         webSocketOnError : function (event) {
           console.log("websocket error");
           console.log(event);
           self.emitEvent("message", data.data);

         }, 

         send: function (type, path) {
             var self = this;
             path = URL.cleanPath(path);
             //var url = path + ".harray.3.json";

            /* http.get(url, function(res) {
                 var data = "";
                 res.on("data", function (e) {
                     data += e;
                 })
                     .on("end", function (e) {
                         /*var eventData = {"path": path, "type" : "request", "parent" : URL.getRelativeParent(path, 1)};
                         data = _.assign(eventData, JSON.parse(data));

                         self.emitEvent("message", data);*/

                         // pre fetch children and cache
                       /*  _.forEach(data.__children__, function (child) {
                             var childPath = path + "/" + child["__name__"];
                             var childProperties = {"path": childPath, "type" : "cache", "parent" : URL.getRelativeParent(childPath, 1)};
                             var object = _.assign(childProperties, child);
                             self.emitEvent("message", object);
                         });//

                     })

             });*/

             try {
               self.websocket.send(type + ": " + path);
            }catch(e) {
             console.log(e);
           }
         }
}


module.exports = WebsocketResolver;
