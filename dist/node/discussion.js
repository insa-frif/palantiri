"use strict";
var Bluebird = require("bluebird");
var OChatDiscussion = (function () {
    function OChatDiscussion() {
    }
    OChatDiscussion.prototype.getMessages = function (maxMessages, afterDate, filter) {
        // TODO : this depends on how we manage heterogeneous ContactAccount
        //        see in OchatUser.getOrCreateDiscussion
        // NOTES : as discussed, the best for heterogeneous Discussions is to just getMessage
        //         not older than the creationDate of the discussion.
        //         In an extreme case, we can let the user did it, but he will then have to
        //         give us a method that merge messages, because it has no semantic for us.
        return undefined;
    };
    OChatDiscussion.prototype.sendMessage = function (msg, callback) {
        var err = null;
        for (var _i = 0, _a = this.participants; _i < _a.length; _i++) {
            var recipient = _a[_i];
            var gotIt = false;
            // TODO : rework this
            for (var _b = 0, _c = this.owner.accounts; _b < _c.length; _b++) {
                var ownerAccount = _c[_b];
                if (ownerAccount.protocol.toLowerCase() === recipient.protocol.toLowerCase()) {
                    var hasAllAccounts = true;
                    for (var _d = 0, _e = recipient.members; _d < _e.length; _d++) {
                        var recipAccount = _e[_d];
                        if (!ownerAccount.hasContactAccount(recipient[0])) {
                            hasAllAccounts = false;
                            break;
                        }
                    }
                    if (hasAllAccounts) {
                        ownerAccount.sendMessageTo(recipient, msg, callback);
                        gotIt = true;
                    }
                }
            }
            if (!err && !gotIt) {
                err = new Error("At least one recipient could not be served.");
            }
        }
        callback(err, msg);
    };
    OChatDiscussion.prototype.addParticipants = function (p) {
        var _this = this;
        if (this.participants.indexOf(p) === -1) {
            var param = [p.protocol];
            this.owner.getAccounts(param).then(function (ownerAccounts) {
                var compatibleParticipants = [];
                for (var _i = 0, _a = _this.participants; _i < _a.length; _i++) {
                    var participant = _a[_i];
                    if (participant.protocol === p.protocol) {
                        compatibleParticipants.push(participant);
                    }
                }
                var gotIt = false;
                var _loop_1 = function(compatibleParticipant) {
                    for (var _b = 0, ownerAccounts_1 = ownerAccounts; _b < ownerAccounts_1.length; _b++) {
                        var ownerAccount = ownerAccounts_1[_b];
                        if (ownerAccount.hasContactAccount(compatibleParticipant.members[0])) {
                            // Ok, we have determined which one of the user's accounts
                            // owns the current compatible participant.
                            // Now if it owns the ContactAccounts that we want to add
                            // to this discussion too, we win.
                            if (ownerAccount.hasContactAccount(p.members[0])) {
                                // That's it, we win !
                                ownerAccount.getOrCreateConnection()
                                    .then(function (co) {
                                    co.getConnectedApi();
                                })
                                    .then(function (api) {
                                    api.addMembersToGroupChat(p.members, compatibleParticipant, function (err) {
                                        if (!err) {
                                            compatibleParticipant.addMembers(p.members);
                                        }
                                    });
                                });
                                gotIt = true;
                                break;
                            }
                        }
                    }
                    if (gotIt) {
                        return "break";
                    }
                };
                for (var _c = 0, compatibleParticipants_1 = compatibleParticipants; _c < compatibleParticipants_1.length; _c++) {
                    var compatibleParticipant = compatibleParticipants_1[_c];
                    var state_1 = _loop_1(compatibleParticipant);
                    if (state_1 === "break") break;
                }
                // In the case where we still not have been able to add these participants,
                // there is two solutions :
                if (!gotIt) {
                    if (compatibleParticipants.length === 0) {
                        // First, we are trying to add accounts using a protocol which is
                        // not in this discussion yet. We just have to add these participants
                        // to this discussion, which will become heterogeneous.
                        _this.participants.push(p);
                        _this.heterogeneous = true;
                    }
                    else {
                        // Second, we are trying to add accounts from an UserAccount which has
                        // no current contacts in this discussion. We just have to add them.
                        _this.participants.push(p);
                    }
                }
            });
        }
        return Bluebird.resolve(this);
    };
    OChatDiscussion.prototype.removeParticipants = function (contactAccount) {
        // TODO
        return Bluebird.resolve(this);
    };
    OChatDiscussion.prototype.getParticipants = function () {
        return Bluebird.resolve(this.participants);
    };
    OChatDiscussion.prototype.onMessage = function (callback) {
        // TODO : see troubles in interfaces.ts before
        return undefined;
    };
    OChatDiscussion.prototype.getName = function () {
        return Bluebird.resolve(this.name);
    };
    OChatDiscussion.prototype.getDescription = function () {
        return Bluebird.resolve(this.description);
    };
    OChatDiscussion.prototype.getSettings = function () {
        return Bluebird.resolve(this.settings);
    };
    return OChatDiscussion;
}());
exports.OChatDiscussion = OChatDiscussion;
