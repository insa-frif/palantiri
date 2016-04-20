import * as Bluebird from "bluebird";

import {ContactAccount} from "palantiri-interfaces";
import {User} from "palantiri-interfaces";
import {Discussion} from "palantiri-interfaces";
import {Connection} from "palantiri-interfaces";
import {GroupAccount} from "palantiri-interfaces";
import {Message} from "palantiri-interfaces";
import {UserAccount} from "palantiri-interfaces";
import {ConnectedApi} from "palantiri-interfaces";
import {Contact} from "palantiri-interfaces";
import {utils} from "palantiri-interfaces";

export class OChatUserAccount implements UserAccount {
  username: string;

  driver: Proxy;

  connection: Connection;

  data: utils.Dictionary<any>;

  owner: User;

  getContacts(): Bluebird<Contact[]> {
    return Bluebird.resolve(this.driver.getContacts(this));
  }

  hasContactAccount(account: ContactAccount): Bluebird<boolean> {
    return Bluebird.resolve(this.getContacts().then((contacts): boolean => {
      for(let contact of contacts) {
        if(contact.accounts[0].localID === account.localID) {
          return true;
        }
      }
      return false;
    }));
  }

  getDiscussions(max?: number, filter?: (discuss: Discussion) => boolean): Bluebird<Discussion[]> {
    return Bluebird.resolve(this.driver.getDiscussions(this, max, filter));
  }

  getOwner(): Bluebird<User> {
    return Bluebird.resolve(this.owner);
  }

  getOrCreateConnection(): Bluebird<Connection> {
    if(this.connection && this.connection.connected) {
      return Bluebird.resolve(this.connection);
    }
    return Bluebird.resolve(this.driver.createConnection(this));
  }

  sendMessageTo(recipients: GroupAccount, msg: Message, callback?: (err: Error, succes: Message) => any): void {
    this.driver.sendMessage(msg, recipients, callback);
  }

  constructor(owner: User) {
    this.owner = owner;
  }
}
