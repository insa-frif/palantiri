import * as Bluebird from "bluebird";
import { Contact } from "palantiri-interfaces";
export declare class PalantiriContact implements Contact {
    fullname: string;
    protocol: string;
    localID: number;
    isCompatibleWith(protocol: string): boolean;
    getFullname(): string;
    setFullname(newPrincipalName: string): Bluebird.Thenable<Contact>;
}
