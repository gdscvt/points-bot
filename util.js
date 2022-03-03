const fs = require('fs');
const { client, adminRole } = require('./index.js');

module.exports = {
    runPermissionCheck(interaction, acceptCallback) {
        if (interaction.member.roles.cache.some(r => r.name === adminRole)) {
            acceptCallback();
        } else {
            interaction.reply({ content: `You must be atleast ${interaction.guild.roles.cache.find(r => r.name === adminRole)}`, ephemeral: true });
        }
    },
    getPoints(user) {
        try {
            return JSON.parse(fs.readFileSync(`./users/${user.id}.json`, 'utf8')).points;
        } catch (err) {
            return 0;
        }
    },
    setPoints(user, amount) {
        const points = {
            points: amount
        };

        fs.writeFile(`./users/${user.id}.json`, JSON.stringify(points), err => {
            if (err) {
                console.log(err);
            }
        });
    },
    async getSortedUsers() {
        const commandFiles = fs.readdirSync(`./users`).filter(file => file.endsWith(".json"));

        let users = new Array();

        for (file of commandFiles) {            
            const points = JSON.parse(fs.readFileSync(`./users/${file}`, 'utf8')).points;
            const user = await client.users.fetch(file.replaceAll('.json', ''));
            
            const userObj = {
                name: `${user.username}#${user.discriminator}`,
                points: points
            };
            users.push(userObj);
        }

        users.sort((a, b) => {
            return b.points - a.points;
        });

        return users;
    }
}