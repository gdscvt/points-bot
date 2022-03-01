const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-points')
		.setDescription('Adds points to a user.')
        .addUserOption(option => {
            return option.setName('person')
            .setDescription('The person to add points to.')
            .setRequired(true);
        })
        .addIntegerOption(option => {
            return option.setName('amount')
            .setDescription('The number of points to award.')
            .setRequired(true);
        }),
	async execute(interaction) {
		await processCommand(interaction);
	},
};

async function processCommand(interaction) {
    const person = interaction.options.getUser('person');
    const amount = Math.abs(interaction.options.getInteger('amount'));

    await interaction.reply(`Awarding ${amount} point(s) to ${person}`);
}