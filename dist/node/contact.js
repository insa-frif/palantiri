"use strict";
var Bluebird = require("bluebird");
var PalantiriContact = (function () {
    function PalantiriContact() {
    }
    PalantiriContact.prototype.isCompatibleWith = function (protocol) {
        return this.protocol.toLowerCase() === protocol.toLowerCase();
    };
    PalantiriContact.prototype.getFullname = function () {
        return this.fullname;
    };
    PalantiriContact.prototype.setFullname = function (newPrincipalName) {
        this.fullname = newPrincipalName;
        return Bluebird.resolve(this);
    };
    return PalantiriContact;
}());
exports.PalantiriContact = PalantiriContact;
