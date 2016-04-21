import * as Bluebird from "bluebird";

import {Contact} from "palantiri-interfaces";
import {UserAccount} from "palantiri-interfaces";
import {Message} from "palantiri-interfaces";
import {MessageFlags} from "palantiri-interfaces";

export class PalantiriMessage implements Message {
  author: Contact | UserAccount;

  body: string;

  content: any;

  flags: number;

  creationDate: Date;

  lastUpdated: Date;

  getText(): Bluebird<string> {
    return Bluebird.resolve(this.body);
  }

  getCreationDate(): Bluebird<Date> {
    return Bluebird.resolve(this.creationDate);
  }

  getLastUpdateDate(): Bluebird<Date> {
    return Bluebird.resolve(this.lastUpdated);
  }

  getAuthor(): Bluebird<Contact | UserAccount> {
    return Bluebird.resolve(this.author);
  }

  getContent(): Bluebird<any> {
    return Bluebird.resolve(this.content);
  }

  getFlags():Bluebird<number> {
    return Bluebird.resolve(this.flags);
  }

  isEditable(): boolean {
    return (this.flags & MessageFlags.EDITABLE) === MessageFlags.EDITABLE;
  }
}
