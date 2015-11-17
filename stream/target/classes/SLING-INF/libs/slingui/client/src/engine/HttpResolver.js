var http = require('http');
var _ = require("lodash");
var util = require("util");
var URL = require("../utils/URL");
var Resource = require("../api/Resource");
var LocalStorage = require("../storage/LocalStorage");

var HttpResolver = {
    canHandle: function () {
      //  console.log("http resolver resolver canhandle function");
        return true;
    },
    init: function (callback) {
      self.emitEvent("open");
    },
    send: function (type, path) {
        var self = this;
        path = URL.cleanPath(path);

        var url = path + ".harray.3.json";

        http.get(url, function(res) {
            var data = "";
            res.on("data", function (e) {
                data += e;
            })
                .on("end", function (e) {
                    var eventData = {"path": path, "type" : "request", "parent" : URL.getRelativeParent(path, 1)};
                    data = _.assign(eventData, JSON.parse(data));

                    self.emitEvent("message", data);

                    // pre fetch children and cache
                  /*  _.forEach(data.__children__, function (child) {
                        var childPath = path + "/" + child["__name__"];
                        var childProperties = {"path": childPath, "type" : "cache", "parent" : URL.getRelativeParent(childPath, 1)};
                        var object = _.assign(childProperties, child);
                        self.emitEvent("message", object);
                    });*/

                })


        });/*.on('error', function(e) {
                console.log("Got error: " + e.message);
            });*/

    }
}

module.exports = HttpResolver;
