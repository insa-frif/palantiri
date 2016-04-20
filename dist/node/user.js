"use strict";
var Bluebird = require("bluebird");
var OChatUser = (function () {
    function OChatUser() {
        this.accounts = [];
    }
    OChatUser.prototype.getOrCreateDiscussion = function (accounts) {
        var discussion; // The discussion we are looking for
        // TODO : Oups, we have forgotten something.
        //        There's three different cases :
        //        * accounts contains only one account : easy as pie
        //        * accounts contains several accounts but using the same protocol : easy
        //        * accounts contains severas accounts using different protocols : the oups is here
        //        What do we do here ? Trying to merge several discussions from differents protocols,
        //        or using our own database to store these discussions ?
        // NB : now we just have to use Proxy in each account this.accounts to get discussions.
        //      That's a solved problem.
        return Bluebird.resolve(discussion);
    };
    OChatUser.prototype.leaveDiscussion = function (discussion, callback) {
    };
    OChatUser.prototype.getAccounts = function (protocols) {
        if (protocols) {
            var accounts = [];
            for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
                var account = _a[_i];
                for (var _b = 0, protocols_1 = protocols; _b < protocols_1.length; _b++) {
                    var protocol = protocols_1[_b];
                    if (account.driver.isCompatibleWith(protocol)) {
                        accounts.push(account);
                        break;
                    }
                }
            }
            return Bluebird.resolve(accounts);
        }
        return Bluebird.resolve(this.accounts);
    };
    OChatUser.prototype.getContacts = function () {
        // TODO : we can do lots of improvements :
        //        -do not compare otherContact with other someContacts we already added to contacts
        //        -improve how we check if ContactAccount are the same Contact
        //        -check in base if the user specified some time ago that some accounts are the same
        var contacts = null;
        for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
            var account = _a[_i];
            account.getContacts().then(function (someContacts) {
                if (!contacts) {
                    contacts = someContacts;
                }
                else {
                    for (var _i = 0, someContacts_1 = someContacts; _i < someContacts_1.length; _i++) {
                        var otherContact = someContacts_1[_i];
                        var merge = false;
                        for (var _a = 0, contacts_1 = contacts; _a < contacts_1.length; _a++) {
                            var actualContact = contacts_1[_a];
                            if (otherContact.fullname === actualContact.fullname) {
                                actualContact.mergeContacts(otherContact);
                                merge = true;
                                break;
                            }
                        }
                        if (!merge) {
                            contacts.push(otherContact);
                        }
                    }
                }
            });
        }
        return Bluebird.resolve(contacts);
    };
    OChatUser.prototype.addAccount = function (account, callback) {
        var index = this.accounts.indexOf(account);
        var err = null;
        if (index === -1) {
            this.accounts.push(account);
        }
        else {
            err = new Error("This account already exists.");
        }
        if (callback) {
            callback(err, this.accounts);
        }
    };
    OChatUser.prototype.removeAccount = function (account, callback) {
        var index = this.accounts.indexOf(account);
        var err = null;
        if (index === -1) {
            this.accounts.splice(0, 1, account);
        }
        else {
            err = new Error("This account does not exist.");
        }
        if (callback) {
            callback(err, this.accounts);
        }
    };
    OChatUser.prototype.addContact = function (contact, callback) {
        // TODO : this is advanced option.
        //        It's about writing on an account,
        //        and not only reading it.
        //        We will do this later.
    };
    OChatUser.prototype.removeContact = function (contact, callback) {
        // WARNING : we need to warn the user that this will remove the contact from all his accounts
        // TODO : this is advanced option.
        //        It's about writing on an account,
        //        and not only reading it.
        //        We will do this later.
    };
    OChatUser.prototype.onDiscussionRequest = function (callback) {
        // TODO : see troubles in interfaces.ts before
        return undefined;
    };
    OChatUser.prototype.onContactRequest = function (callback) {
        // TODO : see troubles in interfaces.ts before
        return undefined;
    };
    return OChatUser;
}());
exports.OChatUser = OChatUser;
