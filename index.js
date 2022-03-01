const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const prefix = '-';

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.once('ready', begin);
client.on('message', message);

client.login(token);

function begin() {
    console.log('Bot is online!');
}

function message(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'points') {
        message.channel.send('test');
    }
}