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

var Q = require("q");
var _ = require("lodash");
var URL = require("../utils/URL");

/**
 * Resource Object
 * @param path
 * @constructor
 */
var Resource = function (properties, ConnectionManager) {
    this.path = URL.cleanPath(properties.path);
    this.properties = properties;
    this.ConnectionManager = ConnectionManager;
    this.dirty = false;
}

Resource.prototype = {
    /**
     * get path
     * @returns {string} resource path
     */
    getPath: function () {
        return this.path;
    },
    /**
     * retreive property resource values
     * @example
     * currentResource.get("jcr:content").then(function (resource) {
     *     console.log(resource.getPath());
     * });
     *
     * @param property key
     * @returns {Promise} value
     */
    get: function (key) {
        return this.properties[key];
    },

    put: function (key, value) {
        this.properties[key] = value;
        this.dirty = true;
    },

    /**
     * has child nodes
     * @returns {boolean}
     */
    hasChildren: function () {
        return this.properties.__children__;
    },

    /**
     * return array of resources
     *  @example <caption>Example usage of listChildren</caption>
     * currentResource.listChildren().then(function (children) {
     *     for(childResource in children) {
     *       childResource.get("name").then(function (name) {
     *           console.log(name);
     *       });
     *     }
     * }, function (error) {
     *
     * });
     *
     * @returns {promise}
     */
    listChildren: function (callback) {
        //var deferred = Q.defer();
        var self = this;
        var index = 0;
        var results = [];
        var promises = [];

        _.forEach(this.properties.__children__, function (child) {
            var deferred = Q.defer();
             var childPath = self.getPath() + "/" + child["__name__"];
                 self.ConnectionManager.resolve(childPath).then(function (resource) {
                     deferred.resolve(resource);
                 if(callback) {
                     callback.call(self, resource, index++);
                 }
                 //results.push(resource);
                 //if(_.size(results) ===  self.properties.__children__.length) {

                // }
             });
            promises.push(deferred.promise);
         });


        /*_.forEach(this.properties.__children__, function (child) {
            var childPath = self.getPath() + "/" + child["__name__"];
            self.ConnectionManager.resolve(childPath).then(function (resource) {
                if(callback) {
                    callback.call(self, resource, index++);
                }
                results.push(resource);
                if(_.size(results) ===  self.properties.__children__.length) {
                    deferred.resolve(results);
                }
            });
        });       */



        return Q.all(promises);
    },

    /**
     * get a specific child
     * @example
     * currentResource.getChild().then(function (resource, snapshot) {
     *     console.log(resource.getPath());
     *     console.log(snapshot.path);
     *     console.log(snapshot.title);
     *     console.log(snapshot._jcr_content.title);
     * });
     *
     * @param {string} relativechild url
     * @returns {Resource}
     */
    getChild: function (childName) {
        var self = this;
        var childPath = self.getPath() + "/" + childName;
        return self.ConnectionManager.resolve(childPath);
    },

    remove: function () {
        // remove this path
    },

    getParent: function () {
        var self  = this;
        var parentPath = URL.getRelativeParent(self.getPath(), 1);
        return self.ConnectionManager.resolve(parentPath);
    }


}

module.exports = Resource;