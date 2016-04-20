"use strict";
var Bluebird = require("bluebird");
var OChatContact = (function () {
    function OChatContact() {
    }
    OChatContact.prototype.getAccounts = function () {
        return Bluebird.resolve(this.accounts);
    };
    OChatContact.prototype.getNicknames = function () {
        return this.nicknames;
    };
    OChatContact.prototype.getPrincipalName = function () {
        return this.fullname;
    };
    OChatContact.prototype.setPrincipalName = function (newPrincipalName) {
        this.fullname = newPrincipalName;
    };
    OChatContact.prototype.mergeContacts = function (contact, callback) {
        var error = null;
        var numberOfErrors = 0;
        for (var _i = 0, _a = contact.accounts; _i < _a.length; _i++) {
            var contactAccount = _a[_i];
            this.addAccount(contactAccount, function (err, acc) {
                if (err) {
                    numberOfErrors++;
                }
            });
        }
        if (numberOfErrors === contact.accounts.length) {
            error = new Error("Unable to merge contact. Maybe the second was part of the current.");
        }
        else if (numberOfErrors !== 0) {
            error = new Error(numberOfErrors + " account of the contact in parameters could not be added to the current contact.");
        }
        if (callback) {
            callback(error, this);
        }
        return this;
    };
    OChatContact.prototype.unmergeContacts = function (contact, callback) {
        var error = null;
        for (var _i = 0, _a = contact.accounts; _i < _a.length; _i++) {
            var contactAccount = _a[_i];
            this.removeAccount(contactAccount, function (err, acc) {
                if (err) {
                    error = new Error("Unable to unmerge contact. One account in the parameters is not part of the current Contact.");
                }
            });
            if (error) {
                break;
            }
        }
        if (callback) {
            callback(error, this);
        }
        return this;
    };
    OChatContact.prototype.addAccount = function (account, callback) {
        var index = this.accounts.indexOf(account);
        var err = null;
        if (index === -1) {
            this.nicknames.push(account.contactName);
            if (!this.fullname) {
                this.fullname = account.contactName;
            }
            this.accounts.push(account);
        }
        else {
            err = new Error("This account already exists for this contact.");
        }
        if (callback) {
            callback(err, this.accounts);
        }
    };
    OChatContact.prototype.removeAccount = function (account, callback) {
        var index = this.accounts.indexOf(account);
        var err = null;
        if (index === -1) {
            this.accounts.splice(0, 1, account);
            this.nicknames.splice(0, 1, account.contactName);
        }
        else {
            err = new Error("This account does not exist for this contact.");
        }
        if (callback) {
            callback(err, this.accounts);
        }
    };
    return OChatContact;
}());
exports.OChatContact = OChatContact;
