"use strict";
var Bluebird = require("bluebird");
var OChatGroupAccount = (function () {
    function OChatGroupAccount() {
    }
    OChatGroupAccount.prototype.addMembers = function (members, callback) {
        var err = null;
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var account = members_1[_i];
            if (account.protocol.toLocaleLowerCase() !== this.protocol.toLocaleLowerCase()) {
                if (!err) {
                    err = new Error("One of the accounts does not have the right protocol.");
                }
            }
            else {
                if (this.members.indexOf(account) !== -1) {
                    if (!err) {
                        err = new Error("One of the account is already a member.");
                    }
                }
                else {
                    this.members.push(account);
                }
            }
        }
        if (callback) {
            callback(err, this.members);
        }
        return Bluebird.resolve(this);
    };
    return OChatGroupAccount;
}());
exports.OChatGroupAccount = OChatGroupAccount;
