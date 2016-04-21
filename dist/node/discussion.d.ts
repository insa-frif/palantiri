import * as Bluebird from "bluebird";
import { Discussion } from "palantiri-interfaces";
import { DiscussionAuthorization } from "palantiri-interfaces";
import { Contact } from "palantiri-interfaces";
import { Message } from "palantiri-interfaces";
import { UserAccount } from "palantiri-interfaces";
import { utils } from "palantiri-interfaces";
export declare class PalantiriDiscussion implements Discussion {
    protocol: string;
    localDiscussionID: number;
    creationDate: Date;
    name: string;
    isPrivate: boolean;
    description: string;
    participants: Contact[];
    owner: UserAccount;
    authorizations: DiscussionAuthorization;
    settings: utils.Dictionary<any>;
    isCompatibleWith(protocol: string): boolean;
    getMessages(maxMessages: number, afterDate?: Date, filter?: (msg: Message) => boolean): Bluebird<Message[]>;
    addParticipants(p: Contact[]): Bluebird<Discussion>;
    removeParticipants(contact: Contact[]): Bluebird<Discussion>;
    getParticipants(): Bluebird<Contact[]>;
    getName(): string;
    getDescription(): string;
    getSettings(): utils.Dictionary<any>;
}
