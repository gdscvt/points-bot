const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-points')
		.setDescription('Removes points from a user.')
        .addUserOption(option => {
            return option.setName('person')
            .setDescription('The person to remove points from.')
            .setRequired(true);
        })
        .addIntegerOption(option => {
            return option.setName('amount')
            .setDescription('The number of points to remove.')
            .setRequired(true);
        }),
	async execute(interaction) {
		await processCommand(interaction);
	},
};

async function processCommand(interaction) {
    const person = interaction.options.getUser('person');
    const amount = Math.abs(interaction.options.getInteger('amount'));

    await interaction.reply(`Removing ${amount} point(s) from ${person}`);
}