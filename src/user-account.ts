import * as Bluebird from "bluebird";

import {Discussion} from "palantiri-interfaces";
import {Connection} from "palantiri-interfaces";
import {Message} from "palantiri-interfaces";
import {UserAccount} from "palantiri-interfaces";
import {Contact} from "palantiri-interfaces";
import {utils} from "palantiri-interfaces";

export abstract class PalantiriUserAccount implements UserAccount {
  username: string;

	protocol: string;

  connection: Connection;

  data: utils.Dictionary<any>;

  getContacts(): Bluebird<Contact[]> {
	  let accounts: Contact[] = [];
	  if(this.connection && this.connection.connected) {
		  this.connection.getConnectedApi()
			  .then((api) => {
				  return api.getContacts();
			  })
		    .then((contactsAccounts) => {
			    accounts = contactsAccounts;
		    });
	  }
    return Bluebird.resolve(accounts);
  }

  hasContactAccount(account: Contact): Bluebird<boolean> {
    return Bluebird.resolve(this.getContacts().then((contacts): boolean => {
      for(let contact of contacts) {
        if(contact.localID === account.localID) {
          return true;
        }
      }
      return false;
    }));
  }

  getDiscussions(max?: number, filter?: (discuss: Discussion) => boolean): Bluebird<Discussion[]> {
	  let discuss: Discussion[] = [];
	  let that = this;
	  if(this.connection && this.connection.connected) {
		  this.connection.getConnectedApi()
			  .then((api) => {
				  return api.getDiscussions(that, max, filter);
			  })
		    .then((discussions) => {
			    discuss = discussions;
		    });
	  }
    return Bluebird.resolve(discuss);
  }

  abstract getOrCreateConnection(): Bluebird<Connection>;
	//  This method is abstract because specific :
	//  We can't instanciate a new Connection object without
	//  just with new Connection(), because it depends of
	//  the used protocol of this account.

  sendMessage(msg: Message, discussion: Discussion, callback?: (err: Error) => any): Bluebird.Thenable<UserAccount> {
    let error: Error = null;
		if (!this.connection || !this.connection.connected) {
			error = new Error("You are not connected to the current account.");
		} else {
			this.connection.getConnectedApi().then((api) => {
				api.sendMessage(msg, discussion, (err) => {
					if(err) {
						error = err;
					}
				});
			});
		}

		if(callback) {
			callback(error);
		}

	  return Bluebird.resolve(this);
  }
}
