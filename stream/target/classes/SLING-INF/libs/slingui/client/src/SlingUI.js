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

// SlingUI.js

var http = require("http");
var Q = require("q");
var ws = require("ws");
var util = require("util");
var EventEmitter = require('events').EventEmitter;
var Resource = require("./api/Resource");
var URL = require("./utils/URL");
var ConnectionManager = require("./engine/DefaultConnectionManager");
var domready = require("domready");

var _ = require("lodash");
var jquery = require("jquery");



/**
 * slingui
 * @constructor
 */
function SlingUI(url) {
    var self = this;
    EventEmitter.call(self);

    ConnectionManager.register(self);

    self.request = URL.getPathInfo((url) ? url : location.href);
    self.request.getResource = function () {
        return self.resolve(self.request.resourcePath);
    }

}

util.inherits(SlingUI, EventEmitter);

/**
 *
 * @param msg
 */
SlingUI.prototype.send = function (msg) {
    ConnectionManager.send(msg);
}


/**
 *
 * @param url
 */
SlingUI.prototype.resolve = function (url) {
    return ConnectionManager.resolve(url, this);
}


/**
 * right now a clone from SlingUI.resolve
 * @param path
 * @returns {*}
 */
SlingUI.prototype.getResource = function (path) {
    return this.resolve(path);
}


/**
 * Returns a Resource object for data located at the given path.
 * This specification does not define the location for resources or the semantics for resource paths. For an implementation reading content from a Java Content Repository, the path could be a javax.jcr.Item path from which the resource object is loaded.
 *
 * @param {Resource} base   The base Resource against which a relative path argument given by path is resolved. This parameter may be null if the path is known to be absolute.
 * @param {string} path     The path to the resource object to be loaded. If the path is relative, i.e. does not start with a slash (/), the resource relative to the given base resource is returned. The path may contain relative path specifiers like . (current location) and .. (parent location), which are resolved by this method.
 * @returns {Q.promise}     The Resource object loaded from the path or null if the path does not resolve to a resource.
 */
/*SlingUI.prototype.getResource = function (base, path) {
    return this.resolve(path);
}*/



SlingUI.createResource = function (parent, name, properties) {
    var deferred = Q.defer();


    return deferred.promise;
}

module.exports = SlingUI;



/*
domready(function () {
    console.log("application ready");
    console.log(URL.decompose(location.href));
});*/


