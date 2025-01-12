const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setDescription('Quer acabar com a diversão pow ?').setName('stop'),
	async execute(interaction) {
		const { client, member } = interaction;
		const voiceChannel = member.voice.channel;

		if (!voiceChannel) {
			return await interaction.reply({ content: 'Pow irmão, aí fica dificil. Tu precisa tá em um canal de voz pra tocar a musiq cabeção.', flags: MessageFlags.Ephemeral });
		}

		await client.distube.stop(voiceChannel.guild.id).then(async () => {
			await interaction.reply({ content: 'Esse cara acabou com a diversão mesmo vey' });
		});
	},

};
