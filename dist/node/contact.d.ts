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
    setPrincipalName(newPrincipalName: string): void;
    mergeContacts(contact: Contact, callback?: (err: Error, succes: Contact) => any): Contact;
    unmergeContacts(contact: Contact, callback?: (err: Error, succes: Contact) => any): Contact;
    addAccount(account: ContactAccount, callback?: (err: Error, succes: ContactAccount[]) => any): void;
    removeAccount(account: ContactAccount, callback?: (err: Error, succes: ContactAccount[]) => any): void;
}
