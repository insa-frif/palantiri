"use strict";
var Bluebird = require("bluebird");
var OChatUserAccount = (function () {
    function OChatUserAccount() {
    }
    OChatUserAccount.prototype.getContacts = function () {
        var accounts = [];
        var that = this;
        if (this.connection && this.connection.connected) {
            this.connection.getConnectedApi()
                .then(function (api) {
                return api.getContacts(that);
            })
                .then(function (contactsAccounts) {
                accounts = contactsAccounts;
            });
        }
        return Bluebird.resolve(accounts);
        // TODO : mon enchainement de promesse est-il bon ?
        // TODO : de maniere plus generale, est ce que mes retours par promesse sont bons ?
    };
    OChatUserAccount.prototype.hasContactAccount = function (account) {
        return Bluebird.resolve(this.getContacts().then(function (contacts) {
            for (var _i = 0, contacts_1 = contacts; _i < contacts_1.length; _i++) {
                var contact = contacts_1[_i];
                if (contact.localID === account.localID) {
                    return true;
                }
            }
            return false;
        }));
        // TODO : et celui-la de retour, il est bon ?
    };
    OChatUserAccount.prototype.getDiscussions = function (max, filter) {
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
    OChatUserAccount.prototype.sendMessageTo = function (recipients, msg, callback) {
        var error = null;
        if (recipients.protocol !== this.protocol) {
            error = new Error("Protocols are inconpatible.");
        }
        else if (!this.connection || !this.connection.connected) {
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
        // TODO : et la, ca ne fait pas de la merde par hasard entre la promesse
        //        et les deux callbacks et le retour par promesse ?
        if (callback) {
            callback(error, msg);
        }
        return Bluebird.resolve(this);
    };
    return OChatUserAccount;
}());
exports.OChatUserAccount = OChatUserAccount;
