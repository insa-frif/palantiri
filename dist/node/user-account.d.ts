import * as Bluebird from "bluebird";
import { ContactAccount } from "palantiri-interfaces";
import { User } from "palantiri-interfaces";
import { Discussion } from "palantiri-interfaces";
import { Connection } from "palantiri-interfaces";
import { GroupAccount } from "palantiri-interfaces";
import { Message } from "palantiri-interfaces";
import { UserAccount } from "palantiri-interfaces";
import { Proxy } from "palantiri-interfaces";
import { Contact } from "palantiri-interfaces";
import { utils } from "palantiri-interfaces";
export declare class OChatUserAccount implements UserAccount {
    username: string;
    driver: Proxy;
    connection: Connection;
    data: utils.Dictionary<any>;
    owner: User;
    getContacts(): Bluebird<Contact[]>;
    hasContactAccount(account: ContactAccount): Bluebird<boolean>;
    getDiscussions(max?: number, filter?: (discuss: Discussion) => boolean): Bluebird<Discussion[]>;
    getOwner(): Bluebird<User>;
    getOrCreateConnection(): Bluebird<Connection>;
    sendMessageTo(recipients: GroupAccount, msg: Message, callback?: (err: Error, succes: Message) => any): void;
    constructor(owner: User);
}
