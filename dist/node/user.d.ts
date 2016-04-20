import * as Bluebird from "bluebird";
import { Contact } from "palantiri-interfaces";
import { User } from "palantiri-interfaces";
import { Discussion } from "palantiri-interfaces";
import { UserAccount } from "palantiri-interfaces";
import { GroupAccount } from "palantiri-interfaces";
import { EventEmitter } from "events";
export declare class OChatUser extends EventEmitter implements User {
    username: string;
    accounts: UserAccount[];
    getOrCreateDiscussion(accounts: GroupAccount[]): Bluebird<Discussion>;
    leaveDiscussion(discussion: Discussion): Bluebird.Thenable<User>;
    getAccounts(protocols?: string[]): Bluebird<UserAccount[]>;
    getContacts(): Bluebird<Contact[]>;
    addAccount(account: UserAccount, callback?: (err: Error, succes: UserAccount[]) => any): Bluebird.Thenable<User>;
    removeAccount(account: UserAccount, callback?: (err: Error, succes: UserAccount[]) => any): Bluebird.Thenable<User>;
    addContact(contact: Contact, callback?: (err: Error, succes: Contact[]) => any): Bluebird.Thenable<User>;
    removeContact(contact: Contact, callback?: (err: Error, succes: Contact[]) => any): Bluebird.Thenable<User>;
    connectionsOn(event: string, handler: (...args: any[]) => any): Bluebird.Thenable<User>;
    connectionsOnce(event: string, handler: (...args: any[]) => any): Bluebird.Thenable<User>;
    removeConnectionsListener(event: string, handler: (...args: any[]) => any): Bluebird.Thenable<User>;
    connectionsSetMaxListeners(n: number): Bluebird.Thenable<User>;
}
