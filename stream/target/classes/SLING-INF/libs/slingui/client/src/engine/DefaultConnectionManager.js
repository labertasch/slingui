/******************************************************************************
 * ADOBE CONFIDENTIAL                                                         *
 * ---------------------------------------------------------------------------*
 * Copyright 2015  Adobe Systems Incorporated                                 *
 * All Rights Reserved.                                                       *
 * ---------------------------------------------------------------------------*
 * NOTICE:  All information contained herein is, and remains                  *
 * the property of Adobe Systems Incorporated and its suppliers,              *
 * if any.  The intellectual and technical concepts contained                 *
 * herein are proprietary to Adobe Systems Incorporated and its               *
 * suppliers and are protected by trade secret or copyright law.              *
 * Dissemination of this information or reproduction of this material         *
 * is strictly forbidden unless prior written permission is obtained          *
 * from Adobe Systems Incorporated.                                           *
 ******************************************************************************/



var _ = require("lodash");
var Q = require("q");
var http = require('http');
var ws = require("ws");
var Resource = require("../api/Resource");
var LocalStorage = require("../storage/LocalStorage");
var URL = require("../utils/URL");

var registry = [];
var handler = null;
var websocket;


/**
 * Connection Manager
 * @type {{}}
 * @static
 */
var ConnectionManager = {};


ConnectionManager.connected = false;

/**
 * Message Types
 * @type {{RESOLVE: string, REMOVE: string, ADD: string}}
 * @static
 */
ConnectionManager.messageType = {
    "RESOLVE" : "resolve",
    "REMOVE"  : "remove",
    "ADD"     : "add"
}


/**
 * @static
 */
ConnectionManager.init = function () {
    console.log("default connection manager");
}


ConnectionManager.SlingServer = "ws://localhost:4502/bin/awesome/stream";


ConnectionManager.emitEvent = function(eventType, event) {
    if(eventType === "message"
        && event.type === "cache") {
        var resource = new Resource(event, null);
       LocalStorage.addResource(resource).then(function (resource) {

        }).fail(function (err) {
                console.log("error caching resource");
        });
    } else {
        _.forEach(registry, function(n) {
            if(n) {
                n.emit(eventType, event);
            }
        })
    }
}

/**
 * canhandle things
 * @returns {boolean}
 * @static
 */
ConnectionManager.canHandle = function () {
    console.log("canHandle: default connection manager");
    return true;
}

ConnectionManager.register = function (SlingUI) {
    registry.push(SlingUI);

    if(!ConnectionManager.connected) {
        ConnectionManager.connect(ConnectionManager.SlingServer);
    }else {
        this.emitEvent("open", {});
    }


    SlingUI.on("message", function (e) {
        if(e && e.type) {
            SlingUI.emit(e.path, e);
            SlingUI.emit(e.parent + "/*", e);
        }else {
            console.log("unkown repsonse");
        }
    });
}


ConnectionManager.connect = function (url) {
    var deferred = Q.defer();
    var self = this;

   // websocketresolver

    //  commands(self);

    return deferred.promise;
}

ConnectionManager.addResource = function (resource) {
    var deferred = Q.defer();

    // do the ajax request and add the resource, resolve if added

    return deferred.promise;
}

ConnectionManager.removeResource = function (resource)  {
    var deferred = Q.defer();


    return deferred.promise;
}

ConnectionManager.updateResource = function (resource) {
    var deferred = Q.defer();


    return deferred.promise;
}


ConnectionManager.resolveHandler = function (HandlerToUse) {
    handler = HandlerToUse;
}

ConnectionManager.use = function (Resolver) {
    if(!handler && Resolver.canHandle()) {
        handler = Resolver;
        handler.init.call(this);
    }
    return ConnectionManager;
}


ConnectionManager.resolve = function (path, target) {
    var deferred = Q.defer();
    console.log("resolve resource ");
    path = URL.cleanPath(path);
    console.log(path);

    LocalStorage.getResource(path).then(function (resource) {
        deferred.resolve(new Resource(resource.properties, target));
    })
        .fail(function () {
            target.once(path, function (e) {
                if(e.type === "event") {
                    target.once(e.path, function (e) {
                        deferred.resolve(e);
                    });
                    ConnectionManager.send(ConnectionManager.messageType.RESOLVE, e.path);
                } else {
                    var resource = new Resource(e, target);
                    LocalStorage.addResource(resource).then(function (resource) {
                        deferred.resolve(resource)
                    }).fail(function (err) {
                            deferred.reject(err);
                        });

                }
            });
            ConnectionManager.send(ConnectionManager.messageType.RESOLVE, path);
        });


    return deferred.promise;
}

ConnectionManager.send = function (type, message) {
    handler.send.call(this, type, message);
}

module.exports = ConnectionManager;
