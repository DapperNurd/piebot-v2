const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../models/user');
const BannedUser = require('../models/bannedUsers')

module.exports = {
    name: 'stats',
    description: "this is a stats command!",
    run: async (message, args, client) => {
        var statUser = message.author

        if(args.length > 0) {
            if (args[0].startsWith('<@') && args[0].endsWith('>')) {
                var id = args[0].slice(2, -1);
        
                if (id.startsWith('!')) {
                    id = id.slice(1);
                }
        
                statUser = client.users.cache.get(id);
            } else {
                statUser = client.users.cache.get(args[0]);
            }
        }

        if(statUser == null) {
            return message.channel.send("Could not find user.");
        }

        const bannedUsersVar = await BannedUser.findOne({
            userID: statUser.id
        }, (err, user) => {
            if(user) {
                return;
            }
        });

        const userUniqueCounts = await User.findOne({
            userID: statUser.id
        }, (err, user) => {
            if(err) console.error(err);
            if(!user) {
                const statsNoDBEmbed = new Discord.MessageEmbed()
                .setColor('#FFFFFF')
                .setTitle(`${statUser.username }'s User Stats`)
                .setDescription('User not in database')
                .setAuthor('Piebot Stats', 'https://i.imgur.com/GPtkfXN.png')
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
                if(bannedUsersVar != null && statUser.id == bannedUsersVar.userID) statsNoDBEmbed.setDescription('This user is banned from Piebot commands.');

                return message.channel.send(statsNoDBEmbed);
            }
        });

        if(userUniqueCounts == null) return;
        const statsEmbed = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle(`${statUser.username }'s User Stats`)
        .setAuthor('Piebot Stats', 'https://i.imgur.com/GPtkfXN.png')
        .setThumbnail(statUser.avatarURL({ dynamic: true }))
        .addFields(
            { name: 'Pie Count', value: userUniqueCounts.pieCount, inline: true },
            { name: 'Muffin Count', value: userUniqueCounts.muffinCount, inline: true },
            { name: 'Potato Count', value: userUniqueCounts.potatoCount, inline: true },
            { name: 'Ice Cream Count', value: userUniqueCounts.iceCreamCount, inline: true },
            { name: 'Pizza Count', value: userUniqueCounts.pizzaCount, inline: true },
            { name: 'Fish Fillet Count', value: userUniqueCounts.fishCount, inline: true }
        )
        .setTimestamp()
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`);

        if(bannedUsersVar != null && statUser.id == bannedUsersVar.userID) statsEmbed.setDescription('This user is banned from Piebot commands.');

        message.channel.send(statsEmbed);
        
    }
}