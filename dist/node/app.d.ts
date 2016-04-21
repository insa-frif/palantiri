import * as Bluebird from "bluebird";
import { User } from "palantiri-interfaces";
import { App } from "palantiri-interfaces";
export declare class OChatApp implements App {
    users: User[];
    getUsers(filter?: (user: User) => boolean): Bluebird.Thenable<User[]>;
    addUser(user: User, callback?: (err: Error, users: User[]) => any): Bluebird.Thenable<OChatApp>;
    removeUser(user: User, callback?: (err: Error, users: User[]) => any): Bluebird.Thenable<OChatApp>;
}
