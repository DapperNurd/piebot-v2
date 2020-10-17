const Discord = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = {
    name: 'server',
    description: "this is a server command!",
    run: async (message, args, client) => {

        const serverCounts = await Guild.findOne({
            guildID: message.guild.id
        }, (err, user) => {
            if(err) console.error(err);
            if(!user) {
                const statsNoDBEmbed = new Discord.MessageEmbed()
                .setColor('#ffffff')
                .setTitle(`${statUser.username } Server Stats`)
                .setDescription('Server not in database')
                .setAuthor('Piebot Stats', 'https://i.imgur.com/HSH1eqG.png')
                .setThumbnail(statUser.avatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Pie Count', value: '0', inline: true },
                    { name: 'Muffin Count', value: '0', inline: true },
                    { name: 'Potato Count', value: '0', inline: true },
                    { name: 'Ice Cream Count', value: '0', inline: true },
                    { name: 'Pizza Count', value: '0', inline: true },
                    { name: 'Fish Fillet Count', value: '0', inline: true }
                )
                .setTimestamp()
                .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`);

                return message.channel.send(statsNoDBEmbed);
            }
        });

        if(serverCounts == null) return;
        const statsEmbed = new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setTitle(`${statUser.username } Server Stats`)
        .setAuthor('Piebot Stats', 'https://i.imgur.com/HSH1eqG.png')
        .setThumbnail(statUser.avatarURL({ dynamic: true }))
        .addFields(
            { name: 'Pie Count', value: serverCounts.pieCount, inline: true },
            { name: 'Muffin Count', value: serverCounts.muffinCount, inline: true },
            { name: 'Potato Count', value: serverCounts.potatoCount, inline: true },
            { name: 'Ice Cream Count', value: serverCounts.iceCreamCount, inline: true },
            { name: 'Pizza Count', value: serverCounts.pizzaCount, inline: true },
            { name: 'Fish Fillet Count', value: serverCounts.fishCount, inline: true }
        )
        .setTimestamp()
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`);

        message.channel.send(statsEmbed);
        
    }
}