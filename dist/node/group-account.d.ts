import { ContactAccount } from "palantiri-interfaces";
import { GroupAccount } from "palantiri-interfaces";
export declare class OChatGroupAccount implements GroupAccount {
    protocol: string;
    members: ContactAccount[];
    localDiscussionID: number;
    addMembers(members: ContactAccount[], callback?: (err: Error, members: ContactAccount[]) => any): void;
}
