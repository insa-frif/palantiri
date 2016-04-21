import * as Bluebird from "bluebird";
import { Contact } from "palantiri-interfaces";
import { ContactAccount } from "palantiri-interfaces";
export declare class OChatContact implements Contact {
    fullname: string;
    nicknames: string[];
    accounts: ContactAccount[];
    getAccounts(): Bluebird<ContactAccount[]>;
    getNicknames(): string[];
    getPrincipalName(): string;
    setPrincipalName(newPrincipalName: string): Bluebird.Thenable<Contact>;
    mergeContacts(contact: Contact, callback?: (err: Error, succes: Contact) => any): Bluebird.Thenable<Contact>;
    unmergeContacts(contact: Contact, callback?: (err: Error, succes: Contact) => any): Bluebird.Thenable<Contact>;
    addAccount(account: ContactAccount, callback?: (err: Error, succes: ContactAccount[]) => any): Bluebird.Thenable<Contact>;
    removeAccount(account: ContactAccount, callback?: (err: Error, succes: ContactAccount[]) => any): Bluebird.Thenable<Contact>;
}
