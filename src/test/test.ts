// Add your tests here

import {EventEmitter} from "events";

class AlarmEmitter extends EventEmitter{
	interval: number;
	count: number;
	name: string;

	constructor (name: string, interval: number) {
		super();
		this.name = name;
		this.interval = interval;
		this.count = 0;
	}

	startToEmit () {
		setInterval(() => {
			console.log(this.name + " is emitting the event "+this.count);
			this.emit("tempoExpiree", this.count);
			this.count++;
		}, this.interval);
	}
}

class AlarmConsummer {
	name: string;

	constructor (name: string) {
		this.name = name;
	}

	handleEvents(emitter: AlarmEmitter) {
		emitter.on("tempoExpiree", (count: number) => {
			console.log(this.name + " received event " + count + " from " + emitter.name);
		});
	}
}

let consummerA = new AlarmConsummer("consumerA");
let consummerB = new AlarmConsummer("consumerB");

let emitter1000 = new AlarmEmitter("emitter1000", 1000);
let emitter2500 = new AlarmEmitter("emitter2500", 2500);

consummerA.handleEvents(emitter1000);
consummerB.handleEvents(emitter1000);
consummerB.handleEvents(emitter2500);

emitter1000.startToEmit();
emitter2500.startToEmit();