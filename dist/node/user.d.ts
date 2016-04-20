import * as Bluebird from "bluebird";
import { Contact } from "palantiri-interfaces";
import { User } from "palantiri-interfaces";
import { Discussion } from "palantiri-interfaces";
import { UserAccount } from "palantiri-interfaces";
import { GroupAccount } from "palantiri-interfaces";
import { OChatApp } from "./app";
export declare class OChatUser implements User {
    username: string;
    app: OChatApp;
    accounts: UserAccount[];
    getOrCreateDiscussion(accounts: GroupAccount[]): Bluebird<Discussion>;
    leaveDiscussion(discussion: Discussion, callback?: (err: Error, succes: Discussion) => any): void;
    getAccounts(protocols?: string[]): Bluebird<UserAccount[]>;
    getContacts(): Bluebird<Contact[]>;
    addAccount(account: UserAccount, callback?: (err: Error, succes: UserAccount[]) => any): void;
    removeAccount(account: UserAccount, callback?: (err: Error, succes: UserAccount[]) => any): void;
    addContact(contact: Contact, callback?: (err: Error, succes: Contact[]) => any): void;
    removeContact(contact: Contact, callback?: (err: Error, succes: Contact[]) => any): void;
    onDiscussionRequest(callback: (disc: Discussion) => any): User;
    onContactRequest(callback: (contact: Contact) => any): User;
}
