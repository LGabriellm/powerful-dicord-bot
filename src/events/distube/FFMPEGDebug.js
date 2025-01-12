const { Events } = require('distube');
module.exports = {
	name: 'FFMPEGDebug',
	type: 'distube',
	debug: true,
	async execute(client) {
		client.distube.on(Events.FFMPEG_DEBUG, console.log);
	},
};