const { Events } = require('distube');

const { EmbedBuilder } = require('discord.js');


module.exports = {
	name: Events.PLAY_SONG,
	type: 'distube',
	async execute(queue, song) {
		const embedCurrentSong = new EmbedBuilder().setTitle(song.name).setDescription('Tocando agora').setURL(song.url).addFields({ name:'Duração', value: `\`${song.formattedDuration}\`` }).setThumbnail(song.thumbnail).setAuthor({ name: song.metadata.interaction.member.user.tag, iconURL: song.metadata.interaction.member.user.avatarURL() });
		queue.textChannel.send({ embeds: [embedCurrentSong] });
	},
};