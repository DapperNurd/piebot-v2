const Discord = require('discord.js');
const mongoose = require('mongoose');

const foodCommands = ["!pie, !pierate", "!muffin", "!potato, !tater", "!icecream", "!pizza", "!fish", "!menu (food)" ];
const miscCommands = ["!help, !commands", "!stats, !info", "!server, !guild", "!ask (question)", "!scale (max) (question)", "!coinflip, !cf", "!ping" ];

module.exports = {
    name: 'help',
    description: "this is a help command!",
    run: async (message, args, client) => {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setAuthor(`Piebot Help`)
        .setTitle("Commands")
        .addFields(
            { name: 'Food Commands', value: foodCommands },
            { name: 'Misc Commands', value: miscCommands },
        )
        //.setThumbnail(client.users.cache.get("549418373130223630").avatarURL({ dynamic: true }))
        .setThumbnail('https://i.imgur.com/GPtkfXN.png')
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()

        message.channel.send(helpEmbed);
    }
}
