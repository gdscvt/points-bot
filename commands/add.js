const { SlashCommandBuilder } = require('@discordjs/builders');
const { getPoints, setPoints, hasAdminRole, getAdminRole, runPermissionCheck } = require('../util.js');

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
    runPermissionCheck(interaction, () => {
        const person = interaction.options.getUser('person');
        const amount = Math.abs(interaction.options.getInteger('amount'));

        const newAmount = getPoints(person) + amount;
        setPoints(person, newAmount);

        interaction.reply(`Awarding ${amount} point(s) to ${person}`);
    });
}