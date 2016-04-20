import { Connection } from "palantiri-interfaces";
import { EventEmitter } from "events";
export declare class OChatConnection extends EventEmitter implements Connection {
    connected: boolean;
}
