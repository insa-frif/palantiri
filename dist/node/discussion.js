"use strict";
var Bluebird = require("bluebird");
var PalantiriDiscussion = (function () {
    function PalantiriDiscussion() {
    }
    PalantiriDiscussion.prototype.isCompatibleWith = function (protocol) {
        return this.protocol.toLowerCase() === protocol.toLowerCase();
    };
    PalantiriDiscussion.prototype.getMessages = function (maxMessages, afterDate, filter) {
        // TODO : this depends on how we manage heterogeneous ContactAccount
        //        see in OchatUser.getOrCreateDiscussion
        // NOTES : as discussed, the best for heterogeneous Discussions is to just getMessage
        //         not older than the creationDate of the discussion.
        //         In an extreme case, we can let the user did it, but he will then have to
        //         give us a method that merge messages, because it has no semantic for us.
        return undefined;
    };
    PalantiriDiscussion.prototype.addParticipants = function (p) {
        var that = this;
        var error = null;
        var _loop_1 = function(part) {
            if (this_1.participants.indexOf(part) === -1) {
                if (this_1.owner.connection && this_1.owner.connection.connected) {
                    this_1.owner.connection.getConnectedApi()
                        .then(function (api) {
                        var members = [part];
                        return api.addMembersToDiscussion(members, that, function (err) {
                            if (err) {
                                console.log("Can't add Contact " + part.fullname + ":");
                                console.log(err);
                                error = err;
                            }
                        });
                    })
                        .then(function (disc) {
                        if (!error) {
                            that.participants.push(part);
                        }
                    });
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, p_1 = p; _i < p_1.length; _i++) {
            var part = p_1[_i];
            _loop_1(part);
        }
        return Bluebird.resolve(this);
    };
    PalantiriDiscussion.prototype.removeParticipants = function (contact) {
        var that = this;
        var error = null;
        var _loop_2 = function(part) {
            if (this_2.participants.indexOf(part) === -1) {
                if (this_2.owner.connection && this_2.owner.connection.connected) {
                    this_2.owner.connection.getConnectedApi()
                        .then(function (api) {
                        var members = [part];
                        return api.removeMembersFromDiscussion(members, that, function (err) {
                            if (err) {
                                console.log("Can't remove Contact " + part.fullname + " from this discussion:");
                                console.log(err);
                                error = err;
                            }
                        });
                    })
                        .then(function (disc) {
                        if (!error) {
                            that.participants.splice(0, 1, part);
                        }
                    });
                }
            }
        };
        var this_2 = this;
        for (var _i = 0, contact_1 = contact; _i < contact_1.length; _i++) {
            var part = contact_1[_i];
            _loop_2(part);
        }
        return Bluebird.resolve(this);
    };
    PalantiriDiscussion.prototype.getParticipants = function () {
        return Bluebird.resolve(this.participants);
    };
    PalantiriDiscussion.prototype.getName = function () {
        return this.name;
    };
    PalantiriDiscussion.prototype.getDescription = function () {
        return this.description;
    };
    PalantiriDiscussion.prototype.getSettings = function () {
        return this.settings;
    };
    return PalantiriDiscussion;
}());
exports.PalantiriDiscussion = PalantiriDiscussion;
