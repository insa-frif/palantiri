import * as Bluebird from "bluebird";

import {Discussion} from "palantiri-interfaces";
import {DiscussionAuthorization} from "palantiri-interfaces";
import {Contact} from "palantiri-interfaces";
import {Message} from "palantiri-interfaces";
import {UserAccount} from "palantiri-interfaces";
import {utils} from "palantiri-interfaces";

export class PalantiriDiscussion implements Discussion {
	protocol: string;

	localDiscussionID: number;

  creationDate: Date;

  name: string;

  isPrivate: boolean;

  description: string;

  participants: Contact[];

  owner: UserAccount;

	authorizations: DiscussionAuthorization;

  settings: utils.Dictionary<any>;

	isCompatibleWith(protocol: string): boolean {
		return this.protocol.toLowerCase() === protocol.toLowerCase();
	}

  getMessages(maxMessages: number, afterDate?: Date, filter?: (msg: Message) => boolean): Bluebird<Message[]> {
    // TODO : this depends on how we manage heterogeneous ContactAccount
    //        see in OchatUser.getOrCreateDiscussion
    // NOTES : as discussed, the best for heterogeneous Discussions is to just getMessage
    //         not older than the creationDate of the discussion.
    //         In an extreme case, we can let the user did it, but he will then have to
    //         give us a method that merge messages, because it has no semantic for us.
    return undefined;
  }

  addParticipants(p: Contact[]): Bluebird<Discussion> {
	  let that = this;
	  let error: Error = null;
	  for(let part of p) {
		  if(this.participants.indexOf(part) === -1) {
			  if(this.owner.connection && this.owner.connection.connected) {
				  this.owner.connection.getConnectedApi()
					  .then((api) => {
						  let members: Contact[] = [part];
						  return api.addMembersToDiscussion(members, that, (err) => {
							  if(err) {
								  console.log("Can't add Contact " + part.fullname +":");
								  console.log(err);
								  error = err;
							  }
						  });
				    })
					  .then((disc) => {
							if(!error) {
								that.participants.push(part);
							}
					  });
			  }
		  }
	  }
    return Bluebird.resolve(this);
  }

  removeParticipants(contact: Contact[]): Bluebird<Discussion> {
	  let that = this;
	  let error: Error = null;
	  for(let part of contact) {
		  if(this.participants.indexOf(part) === -1) {
			  if(this.owner.connection && this.owner.connection.connected) {
				  this.owner.connection.getConnectedApi()
					  .then((api) => {
						  let members: Contact[] = [part];
						  return api.removeMembersFromDiscussion(members, that, (err) => {
							  if(err) {
								  console.log("Can't remove Contact " + part.fullname +" from this discussion:");
								  console.log(err);
								  error = err;
							  }
						  });
					  })
					  .then((disc) => {
						  if(!error) {
							  that.participants.splice(0, 1, part);
						  }
					  });
			  }
		  }
	  }
    return Bluebird.resolve(this);
  }

  getParticipants(): Bluebird<Contact[]> {
    return Bluebird.resolve(this.participants);
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getSettings(): utils.Dictionary<any> {
    return this.settings;
  }
}
