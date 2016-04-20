"use strict";
var Bluebird = require("bluebird");
var OChatApp = (function () {
    function OChatApp() {
        this.drivers = []; // All drivers supported by the app
    }
    OChatApp.prototype.getProxyFor = function (protocol) {
        for (var i = 0; i < this.drivers.length; i++) {
            if (this.drivers[i].isCompatibleWith(protocol)) {
                return Bluebird.resolve(this.drivers[i]);
            }
        }
    };
    OChatApp.prototype.addDriver = function (driver, callback) {
        var err = null;
        for (var _i = 0, _a = this.drivers; _i < _a.length; _i++) {
            var prox = _a[_i];
            if (prox.isCompatibleWith(driver.protocol)) {
                err = new Error("This app already has a compatible protocol");
            }
        }
        if (!err) {
            this.drivers.push(driver);
        }
        if (callback) {
            callback(err, this.drivers);
        }
        return this;
    };
    OChatApp.prototype.removeDriversFor = function (protocol, callback) {
        var err = new Error("This app does not support protocol " + protocol);
        for (var index = 0; index < this.drivers.length; index++) {
            var prox = this.drivers[index];
            if (prox.isCompatibleWith(protocol)) {
                err = null;
                this.drivers.splice(index, 1);
            }
        }
        if (callback) {
            callback(err, this.drivers);
        }
        return this;
    };
    OChatApp.prototype.addUser = function (user, callback) {
        var err = null;
        if (this.users.indexOf(user) === -1) {
            err = new Error("This user is already connected to this client.");
        }
        else {
            this.users.push(user);
        }
        if (callback) {
            callback(err, this.users);
        }
        return this;
    };
    OChatApp.prototype.removeUser = function (user, callback) {
        var err = null;
        if (this.users.indexOf(user) === -1) {
            err = new Error("This user was not connected to this client.");
        }
        else {
            this.users.splice(0, 1, user);
        }
        if (callback) {
            callback(err, this.users);
        }
        return this;
    };
    return OChatApp;
}());
exports.OChatApp = OChatApp;
