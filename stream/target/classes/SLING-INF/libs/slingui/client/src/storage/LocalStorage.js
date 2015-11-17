
var Q = require("q");
//var level = require('level-browserify');

var Resource = require("../api/Resource");

//var db = level("./slingui-cache", {valueEncoding: 'json'});


var memCache = {};

var LocalStorage = { }

LocalStorage.getResource =  function (path) {
            var deferred = Q.defer();
            var cachedResource = memCache[path];
                  deferred.reject();
                  /*
            if(cachedResource) {
                deferred.resolve(cachedResource);
            } else {
                deferred.reject(); 
            }*/
            /*db.get(path, function (err, value) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(value);
                }
            })    */
            return deferred.promise;
        }
LocalStorage.addResource = function (resource) {
    var deferred = Q.defer();
    memCache[resource.path] = resource;
    deferred.resolve(resource);

    /*
    db.put(resource.path, resource, function (err) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(resource);
        }
    });*/

    return deferred.promise;
}

LocalStorage.removeResource =  function (resource) {
            localStorage.removeItem(resource.path);
    }

LocalStorage.updateResource =  function (resource) {
    localStorage.setItem(resource.path);
}

module.exports = LocalStorage;
