const { SlashCommandBuilder } = require('@discordjs/builders');
const { setPoints, runPermissionCheck } = require('../util.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-points')
		.setDescription('Sets the number of points a user has.')
        .addUserOption(option => {
            return option.setName('person')
            .setDescription('The person to set the number of points for.')
            .setRequired(true);
        })
        .addIntegerOption(option => {
            return option.setName('amount')
            .setDescription('The number of points to set for that person.')
            .setRequired(true);
        }),
	async execute(interaction) {
		await processCommand(interaction);
	},
};

async function processCommand(interaction) {
    runPermissionCheck(interaction, () => {
        const person = interaction.options.getUser('person');
        const amount = interaction.options.getInteger('amount');

        setPoints(person, amount);

        interaction.reply(`Setting ${person}'s total points to ${amount}`);
    });
}