"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bluebird = require("bluebird");
var events_1 = require("events");
var contact_1 = require("../build/node/contact");
var OChatUser = (function (_super) {
    __extends(OChatUser, _super);
    function OChatUser() {
        _super.apply(this, arguments);
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
    OChatUser.prototype.leaveDiscussion = function (discussion) {
        // TODO : two ways to implements this :
        //        -> for each accounts, get the connection, then the api, then call leaveGroupChat().
        //        -> just emit and event and connections will catch it and do what they need to do.
        return Bluebird.resolve(this);
    };
    OChatUser.prototype.getAccounts = function (protocols) {
        if (protocols) {
            var accounts = [];
            for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
                var account = _a[_i];
                for (var _b = 0, protocols_1 = protocols; _b < protocols_1.length; _b++) {
                    var protocol = protocols_1[_b];
                    if (account.protocol.toLowerCase() === protocol.toLowerCase()) {
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
                var othersContacts = [];
                for (var _i = 0, someContacts_1 = someContacts; _i < someContacts_1.length; _i++) {
                    var someContact = someContacts_1[_i];
                    var ctc = new contact_1.OChatContact();
                    ctc.fullname = someContact.contactName;
                    if (!ctc.nicknames) {
                        ctc.nicknames = [];
                    }
                    if (!ctc.accounts) {
                        ctc.accounts = [];
                    }
                    ctc.nicknames.push(ctc.fullname);
                    ctc.accounts.push(someContact);
                    othersContacts.push(ctc);
                }
                if (!contacts) {
                    contacts = othersContacts;
                }
                else {
                    for (var _a = 0, othersContacts_1 = othersContacts; _a < othersContacts_1.length; _a++) {
                        var otherContact = othersContacts_1[_a];
                        var merge = false;
                        for (var _b = 0, contacts_1 = contacts; _b < contacts_1.length; _b++) {
                            var actualContact = contacts_1[_b];
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
        return Bluebird.resolve(this);
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
        return Bluebird.resolve(this);
    };
    OChatUser.prototype.addContact = function (contact, callback) {
        // TODO : this is advanced option.
        //        It's about writing on an account,
        //        and not only reading it.
        //        We will do this later.
        return Bluebird.resolve(this);
    };
    OChatUser.prototype.removeContact = function (contact, callback) {
        // WARNING : we need to warn the user that this will remove the contact from all his accounts
        // TODO : this is advanced option.
        //        It's about writing on an account,
        //        and not only reading it.
        //        We will do this later.
        return Bluebird.resolve(this);
    };
    OChatUser.prototype.connectionsOn = function (event, handler) {
        for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
            var account = _a[_i];
            if (account.connection && account.connection.connected) {
                account.getOrCreateConnection().then(function (co) {
                    co.on(event, handler);
                });
            }
        }
        return Bluebird.resolve(this);
    };
    OChatUser.prototype.connectionsOnce = function (event, handler) {
        for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
            var account = _a[_i];
            if (account.connection && account.connection.connected) {
                account.getOrCreateConnection().then(function (co) {
                    co.once(event, handler);
                });
            }
        }
        return Bluebird.resolve(this);
    };
    OChatUser.prototype.removeConnectionsListener = function (event, handler) {
        for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
            var account = _a[_i];
            if (account.connection && account.connection.connected) {
                account.getOrCreateConnection().then(function (co) {
                    co.removeListener(event, handler);
                });
            }
        }
        return Bluebird.resolve(this);
    };
    OChatUser.prototype.connectionsSetMaxListeners = function (n) {
        for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
            var account = _a[_i];
            if (account.connection && account.connection.connected) {
                account.getOrCreateConnection().then(function (co) {
                    co.setMaxListeners(n);
                });
            }
        }
        return Bluebird.resolve(this);
    };
    return OChatUser;
}(events_1.EventEmitter));
exports.OChatUser = OChatUser;
