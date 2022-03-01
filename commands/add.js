const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Adds points to a user'),
	async execute(interaction) {
		await interaction.reply({content: 'Test'});
	},
};