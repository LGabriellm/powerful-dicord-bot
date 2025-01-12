const { Events } = require('distube');

const { EmbedBuilder } = require('discord.js');


module.exports = {
	name: Events.ADD_LIST,
	type: 'distube',
	async execute(queue, playlist) {
		const messageArray = [
			'Coloquei na fila já paizão',
			'Para de encher meu saco, já coloquei na fila',
			'Chatão mané, tá na fila já',
		];
		const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
		const embedAddedSong = new EmbedBuilder().setTitle(playlist.name).setDescription(randomMessage).setURL(playlist.url).addFields({ name:'Quantidade de músicas', value: `\`${playlist.songs.length}\`` }).setThumbnail(playlist.thumbnail).setAuthor({ name: playlist.metadata.interaction.member.user.tag, iconURL: playlist.metadata.interaction.member.user.avatarURL() });
		playlist.metadata.interaction.editReply({ embeds: [embedAddedSong] });
	},
};