const { clientId, token, guildId } = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Discord.Client({ 
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
    ],
});

const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(".js"));

const commandsArray = [];
client.commands = new Discord.Collection();
for (const file of commandFiles){
    const newCommand = require(`./commands/${file}`);
    commandsArray.push(newCommand.data.toJSON());
    client.commands.set(newCommand.data.name, newCommand);
}

client.once('ready', async () => {

    const rest = new REST({
        version: "9"
    }).setToken(token);

    (async () => {
        try {
            if(process.env.ENV === "production"){
                await rest.put(Routes.applicationCommands(clientId), {
                    body: commandsArray,
                });
                console.log("Successfully registered commands globally.");
            } else {
                var temp = await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                    body: commandsArray,
                });
                console.log(temp);
                console.log("Successfully registered commands locally.");
            }
        } catch (err) {
            if(err) console.error(err);
        }
    })();
    console.log('Bot Is Ready On Discord!');

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(token);