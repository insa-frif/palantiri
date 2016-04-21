import * as Bluebird from "bluebird";

import {Contact} from "palantiri-interfaces";

export class PalantiriContact implements Contact {
  fullname: string;

  protocol: string;

  localID: number;

	isCompatibleWith(protocol: string): boolean {
		return this.protocol.toLowerCase() === protocol.toLowerCase();
	}

  getFullname(): string {
    return this.fullname;
  }

  setFullname(newPrincipalName: string): Bluebird.Thenable<Contact> {
    this.fullname = newPrincipalName;
	  return Bluebird.resolve(this);
  }
}
