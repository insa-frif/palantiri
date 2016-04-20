import * as Bluebird from "bluebird";
import { ContactAccount } from "palantiri-interfaces";
import { UserAccount } from "palantiri-interfaces";
import { Message } from "palantiri-interfaces";
export declare class OChatMessage implements Message {
    author: ContactAccount | UserAccount;
    body: string;
    content: any;
    flags: number;
    creationDate: Date;
    lastUpdated: Date;
    getText(): Bluebird<string>;
    getCreationDate(): Bluebird<Date>;
    getLastUpdateDate(): Bluebird<Date>;
    getAuthor(): Bluebird<ContactAccount | UserAccount>;
    getContent(): Bluebird<any>;
    getFlags(): Bluebird<number>;
    isEditable(): boolean;
}
