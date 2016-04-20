"use strict";
var Bluebird = require("bluebird");
var OChatUserAccount = (function () {
    function OChatUserAccount(owner) {
        this.owner = owner;
    }
    OChatUserAccount.prototype.getContacts = function () {
        return Bluebird.resolve(this.driver.getContacts(this));
    };
    OChatUserAccount.prototype.hasContactAccount = function (account) {
        return Bluebird.resolve(this.getContacts().then(function (contacts) {
            for (var _i = 0, contacts_1 = contacts; _i < contacts_1.length; _i++) {
                var contact = contacts_1[_i];
                if (contact.accounts[0].localID === account.localID) {
                    return true;
                }
            }
            return false;
        }));
    };
    OChatUserAccount.prototype.getDiscussions = function (max, filter) {
        return Bluebird.resolve(this.driver.getDiscussions(this, max, filter));
    };
    OChatUserAccount.prototype.getOwner = function () {
        return Bluebird.resolve(this.owner);
    };
    OChatUserAccount.prototype.getOrCreateConnection = function () {
        if (this.connection && this.connection.connected) {
            return Bluebird.resolve(this.connection);
        }
        return Bluebird.resolve(this.driver.createConnection(this));
    };
    OChatUserAccount.prototype.sendMessageTo = function (recipients, msg, callback) {
        this.driver.sendMessage(msg, recipients, callback);
    };
    return OChatUserAccount;
}());
exports.OChatUserAccount = OChatUserAccount;
