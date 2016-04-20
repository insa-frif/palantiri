import {Connection} from "palantiri-interfaces";
import {EventEmitter} from "events";

export class OChatConnection extends EventEmitter implements Connection {
  connected: boolean;
}
