const Discord = require('discord.js');
const mongoose = require('mongoose');

const foodCommands = [/*"!pie, !pierate", */"!muffin", "!potato, !tater", "!icecream", "!pizza", "!fish", "!menu (food)" ];
const miscCommands = ["!help, !commands", "!stats, !info", "!global", "!server, !guild", "!ask (question)", "!scale (max) (question)", "!odds, !chances", "!coinflip, !cf", "!ping" ];

module.exports = {
    name: 'help',
    description: "this is a help command!",
    run: async (message, args, client) => {
        const helpEmbed = new Discord.MessageEmbed()
        .setDescription("Command Prefixes\n`!` `.` `-`")
        .setColor('#FFFFFF')
        .setAuthor(`Muffinbot Help`)//Piebot Help
        .setTitle("Commands")
        .addFields(
            { name: 'Food Commands', value: foodCommands },
            { name: 'Misc Commands', value: miscCommands },
        )
        //.setThumbnail(client.users.cache.get("549418373130223630").avatarURL({ dynamic: true }))
        .setThumbnail('https://i.imgur.com/8j0tOnN.png')//https://i.imgur.com/GPtkfXN.png
        .setFooter(`MuffinbotV2 by ${client.users.cache.get("189510396569190401").username}`) //Muffinbot
        .setTimestamp()

        message.channel.send(helpEmbed);
    }
}
