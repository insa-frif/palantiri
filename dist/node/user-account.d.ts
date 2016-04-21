import * as Bluebird from "bluebird";
import { ContactAccount } from "palantiri-interfaces";
import { Discussion } from "palantiri-interfaces";
import { Connection } from "palantiri-interfaces";
import { GroupAccount } from "palantiri-interfaces";
import { Message } from "palantiri-interfaces";
import { UserAccount } from "palantiri-interfaces";
import { utils } from "palantiri-interfaces";
export declare abstract class OChatUserAccount implements UserAccount {
    username: string;
    protocol: string;
    connection: Connection;
    data: utils.Dictionary<any>;
    getContacts(): Bluebird<ContactAccount[]>;
    hasContactAccount(account: ContactAccount): Bluebird<boolean>;
    getDiscussions(max?: number, filter?: (discuss: Discussion) => boolean): Bluebird<Discussion[]>;
    abstract getOrCreateConnection(): Bluebird<Connection>;
    sendMessageTo(recipients: GroupAccount, msg: Message, callback?: (err: Error, succes: Message) => any): Bluebird.Thenable<UserAccount>;
}
