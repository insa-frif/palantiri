import * as Bluebird from "bluebird";
import { User } from "palantiri-interfaces";
import { Discussion } from "palantiri-interfaces";
import { ContactAccount } from "palantiri-interfaces";
import { GroupAccount } from "palantiri-interfaces";
import { Message } from "palantiri-interfaces";
import { utils } from "palantiri-interfaces";
export declare class OChatDiscussion implements Discussion {
    creationDate: Date;
    name: string;
    isPrivate: boolean;
    heterogeneous: boolean;
    description: string;
    participants: GroupAccount[];
    owner: User;
    settings: utils.Dictionary<any>;
    getMessages(maxMessages: number, afterDate?: Date, filter?: (msg: Message) => boolean): Bluebird<Message[]>;
    sendMessage(msg: Message, callback?: (err: Error, succes: Message) => any): void;
    addParticipants(p: GroupAccount): Bluebird<Discussion>;
    removeParticipants(contactAccount: ContactAccount): Bluebird<Discussion>;
    getParticipants(): Bluebird<GroupAccount[]>;
    onMessage(callback: (msg: Message) => any): Bluebird<Discussion>;
    getName(): Bluebird<string>;
    getDescription(): Bluebird<string>;
    getSettings(): Bluebird<utils.Dictionary<any>>;
}
