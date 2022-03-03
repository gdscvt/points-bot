const { SlashCommandBuilder } = require('@discordjs/builders');
const { getSortedUsers } = require('../util.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('points-top')
		.setDescription('Displays the points leaderboard.'),
	async execute(interaction) {
		await processCommand(interaction);
	},
};

async function processCommand(interaction) {
    let output = '__**POINTS LEADERBOARD**__\n';

    let users;

    try {
        users = await getSortedUsers();
        for (place = 1; place <= users.length && place <= 10; place++) {
            const user = users[place - 1];
            output = output.concat(`**${place}.**  ${user.name}:\t\t${user.points} points\n`);
        }
    } catch(err) {
        output.concat(`No data has been recorded yet.`);
    }
    
    interaction.reply({ content: output, ephemeral: true });
}