"use strict";
var Bluebird = require("bluebird");
var OChatApp = (function () {
    function OChatApp() {
    }
    OChatApp.prototype.getUsers = function (filter) {
        if (filter) {
            var okUsers = [];
            for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                if (filter(user)) {
                    okUsers.push(user);
                }
            }
            return Bluebird.resolve(okUsers);
        }
        return Bluebird.resolve(this.users);
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
