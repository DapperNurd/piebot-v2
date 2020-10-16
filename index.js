const Discord = require('discord.js');

const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
client.mongoose = require('./utils/mongoose');

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    for(const file of files) {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    }
});

client.mongoose.init();
client.login(process.env.BOT_TOKEN);