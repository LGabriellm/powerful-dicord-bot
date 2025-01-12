const { Events, MessageFlags } = require('discord.js');
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.log(`Command ${interaction.commandName} not found`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.log(error);
			await interaction.reply({ content: 'Deixa eu te falar, esse troço que tu executou tá errado.', flags: MessageFlags.Ephemeral });
		}
	},
};