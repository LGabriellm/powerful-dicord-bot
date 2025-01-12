const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setDescription('Tu vai pesquisar uma musiq ?').setName('play').addStringOption(option => option.setName('musiq').setDescription('Aqui tu vai lançar o link ou o nome da musiq').setRequired(true)),
	async execute(interaction) {
		const { client, member } = interaction;
		const voiceChannel = member.voice.channel;

		if (!voiceChannel) {
			return await interaction.reply({ content: 'Pow irmão, aí fica dificil. Tu precisa tá em um canal de voz pra tocar a musiq cabeção.', flags: MessageFlags.Ephemeral });
		}

		const search = interaction.options.getString('musiq');

		const queue = client.distube.getQueue(voiceChannel.guild.id);
		const options = {
			member: member,
			metadata: { interaction },
		};
		if (!queue) options.textChannel = interaction.channel;
		await interaction.deferReply();
		await client.distube.play(voiceChannel, search, options).catch(async (error) => {
			console.log(`[DISTUBE] - ${error}`);
			await interaction.editReply({ content: 'Deixa eu te falar, irmão, deu ruim aqui vey.' });
		});


	},

};
