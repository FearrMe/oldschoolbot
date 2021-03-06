const { Event } = require('klasa');
const DBL = require('dblapi.js');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { once: true, event: 'klasaReady' });
	}

	run() {
		this.client.dbl = new DBL(this.client.dblToken, {
			webhookPort: 8000,
			webhookAuth: this.client.dblAuth
		});

		this.client.dbl.webhook.on('vote', vote => this.client.tasks.get('vote').run(vote));
	}

};
