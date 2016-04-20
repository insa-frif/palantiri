"use strict";
var Bluebird = require("bluebird");
// TODO: export MessageFlags in "palantiri-interfaces"
// temporary hack, quickly fix this !!!
var MSG_FLAG_TXT = 0x0001; //  The message contains text
var MSG_FLAG_IMG = 0x0002; //  The message contains picture(s)
var MSG_FLAG_VID = 0x0004; //  The message contains video(s)
var MSG_FLAG_FIL = 0x0008; //  The message contains other file(s)
var MSG_FLAG_URL = 0x0010; //  The message contains an URL
var MSG_FLAG_EDI = 0x0100; //  The message is editable
var OChatMessage = (function () {
    function OChatMessage() {
    }
    OChatMessage.prototype.getText = function () {
        return Bluebird.resolve(this.body);
    };
    OChatMessage.prototype.getCreationDate = function () {
        return Bluebird.resolve(this.creationDate);
    };
    OChatMessage.prototype.getLastUpdateDate = function () {
        return Bluebird.resolve(this.lastUpdated);
    };
    OChatMessage.prototype.getAuthor = function () {
        return Bluebird.resolve(this.author);
    };
    OChatMessage.prototype.getContent = function () {
        return Bluebird.resolve(this.content);
    };
    OChatMessage.prototype.getFlags = function () {
        return Bluebird.resolve(this.flags);
    };
    OChatMessage.prototype.isEditable = function () {
        return (this.flags & MSG_FLAG_EDI) === MSG_FLAG_EDI;
    };
    return OChatMessage;
}());
exports.OChatMessage = OChatMessage;
