const { SlashCommandBuilder } = require('@discordjs/builders');
const { getPoints, runPermissionCheck } = require('../util.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('Checks how many points someone has.')
        .addUserOption(option => {
            return option.setName('person')
            .setDescription('The person to check for.')
            .setRequired(false);
        }),
	async execute(interaction) {
		await processCommand(interaction);
	},
};

async function processCommand(interaction) {
    let person = interaction.options.getUser('person');

    let callback = (user) => {
        const amount = getPoints(user);
        interaction.reply({ content: `${user.username}#${user.discriminator}: ${amount} points`, ephemeral: true });
    };

    if (person == null) {
        callback(interaction.member.user);
        return;
    }
    
    runPermissionCheck(interaction, person => callback(person));
}