"use strict";
var Bluebird = require("bluebird");
var PalantiriUserAccount = (function () {
    function PalantiriUserAccount() {
    }
    PalantiriUserAccount.prototype.getContacts = function () {
        var accounts = [];
        if (this.connection && this.connection.connected) {
            this.connection.getConnectedApi()
                .then(function (api) {
                return api.getContacts();
            })
                .then(function (contactsAccounts) {
                accounts = contactsAccounts;
            });
        }
        return Bluebird.resolve(accounts);
    };
    PalantiriUserAccount.prototype.hasContactAccount = function (account) {
        return Bluebird.resolve(this.getContacts().then(function (contacts) {
            for (var _i = 0, contacts_1 = contacts; _i < contacts_1.length; _i++) {
                var contact = contacts_1[_i];
                if (contact.localID === account.localID) {
                    return true;
                }
            }
            return false;
        }));
    };
    PalantiriUserAccount.prototype.getDiscussions = function (max, filter) {
        var discuss = [];
        var that = this;
        if (this.connection && this.connection.connected) {
            this.connection.getConnectedApi()
                .then(function (api) {
                return api.getDiscussions(that, max, filter);
            })
                .then(function (discussions) {
                discuss = discussions;
            });
        }
        return Bluebird.resolve(discuss);
    };
    //  This method is abstract because specific :
    //  We can't instanciate a new Connection object without
    //  just with new Connection(), because it depends of
    //  the used protocol of this account.
    PalantiriUserAccount.prototype.sendMessageTo = function (recipients, msg, callback) {
        var error = null;
        if (!this.connection || !this.connection.connected) {
            error = new Error("You are not connected to the current account.");
        }
        else {
            this.connection.getConnectedApi().then(function (api) {
                api.sendMessage(msg, recipients, function (err, message) {
                    if (err) {
                        error = err;
                    }
                });
            });
        }
        if (callback) {
            callback(error, msg);
        }
        return Bluebird.resolve(this);
    };
    return PalantiriUserAccount;
}());
exports.PalantiriUserAccount = PalantiriUserAccount;
