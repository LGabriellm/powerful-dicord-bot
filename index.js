const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const { join } = require('node:path');
const fs = require('node:fs');
const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');
const { HttpsProxyAgent } = require('https-proxy-agent');
require('dotenv').config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages,
	],
});

const agent = new HttpsProxyAgent('http://123.123.123.123:8080');
client.distube = new DisTube(client, {
	plugins: [
		new YouTubePlugin({
			ytdlOptions: { requestOptions: { highWaterMark: 1024 * 1024 * 64 }, agent, playerClients: ['ANDROID', 'IOS'] },
			cookies: JSON.parse(fs.readFileSync(join(__dirname, 'cookies.json'))),
		}),
	],
});

client.commands = new Collection();
const commandsFolder = join(__dirname, 'src/commands');
fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js')).forEach(file => {
	const command = require(join(commandsFolder, file));
	if (command.data && command.execute) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[DISCORD.JS] - Error: Command ${file} is missing data or execute function`);
	}
});

const rest = new REST().setToken(process.env.DISCORD_TOKEN);
(async () => {
	try {
		console.log(`[DISCORD.JS] - Started refreshing ${client.commands.size} application (/) commands`);
		const data = await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: client.commands.map(cmd => cmd.data.toJSON()) });
		console.log(`[DISCORD.JS] - Successfully reloaded ${data.length} application (/) commands`);
	}
	catch (error) {
		console.log(error);
	}
})();

const eventsFoldersPath = join(__dirname, 'src/events');
fs.readdirSync(eventsFoldersPath).forEach(folder => {
	const folderPath = join(eventsFoldersPath, folder);
	fs.readdirSync(folderPath).filter(file => file.endsWith('.js')).forEach(file => {
		const event = require(join(folderPath, file));
		const eventHandler = (...args) => event.execute(...args);
		if (event.once) {
			client.once(event.name, eventHandler);
		}
		else if (event.type === 'distube') {
			client.distube.on(event.name, eventHandler);
		}
		else {
			client.on(event.name, eventHandler);
		}
	});
});

client.login(process.env.DISCORD_TOKEN);