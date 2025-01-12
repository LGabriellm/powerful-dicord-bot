const { Events } = require('distube');

const { EmbedBuilder } = require('discord.js');


module.exports = {
	name: Events.ADD_SONG,
	type: 'distube',
	async execute(queue, song) {
		const messageArray = [
			'Coloquei na fila já paizão',
			'Para de encher meu saco, já coloquei na fila',
			'Chatão mané, tá na fila já',
		];
		const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
		const embedAddedSong = new EmbedBuilder().setTitle(song.name).setDescription(randomMessage).setURL(song.url).addFields({ name:'Duração', value: `\`${song.formattedDuration}\`` }).setThumbnail(song.thumbnail).setAuthor({ name: song.metadata.interaction.member.user.tag, iconURL: song.metadata.interaction.member.user.avatarURL() });
		song.metadata.interaction.editReply({ embeds: [embedAddedSong] });
	},
};