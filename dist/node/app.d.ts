import * as Bluebird from "bluebird";
import { User } from "palantiri-interfaces";
import { Proxy } from "palantiri-interfaces";
import { App } from "palantiri-interfaces";
export declare class OChatApp implements App {
    drivers: Proxy[];
    users: User[];
    getProxyFor(protocol: string): Bluebird<Proxy>;
    addDriver(driver: Proxy, callback?: (err: Error, drivers: Proxy[]) => any): OChatApp;
    removeDriversFor(protocol: string, callback?: (err: Error, drivers: Proxy[]) => any): OChatApp;
    addUser(user: User, callback?: (err: Error, users: User[]) => any): OChatApp;
    removeUser(user: User, callback?: (err: Error, users: User[]) => any): OChatApp;
}
