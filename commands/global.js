const Discord = require('discord.js');
const mongoose = require('mongoose');
const GlobalCount = require('../models/globalCount');

module.exports = {
    name: 'global',
    description: "this is the global command!",
    run: async (commandSent, message, args, client) => {

        const globalVar = await GlobalCount.findOne({
            globalID: "global"
        }, (err, guild) => {
            if(err) console.error(err);
            if(!guild) {
                const newGlobal = new GlobalCount({
                    _id: mongoose.Types.ObjectId(),
                    globalID: "global",
                    pieCount: 0,
                    muffinCount: 0,
                    potatoCount: 0,
                    iceCreamCount: 0,
                    pizzaCount: 0,
                    pastaCount: 0,
                    cakeCount: 0,
                    cookieCount: 0,
                    sandwichCount: 0,
                    fishCount: 0
                });

                newGlobal.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('No global database found, creating now.').then(m=> m.delete({timeout:10000}));
            }
        });

        const globalEmbed = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle(`Global Stats`)
        .setAuthor('Piebot Stats', 'https://i.imgur.com/GPtkfXN.png') //Piebot, check help.js for old link
        .setThumbnail('https://creazilla-store.fra1.digitaloceanspaces.com/emojis/49917/globe-showing-americas-emoji-clipart-md.png')
        .addFields(
            { name: 'Pie Count', value: globalVar.pieCount, inline: true },
            { name: 'Muffin Count', value: globalVar.muffinCount, inline: true },
            { name: 'Potato Count', value: globalVar.potatoCount, inline: true },
            { name: 'Ice Cream Count', value: globalVar.iceCreamCount, inline: true },
            { name: 'Pizza Count', value: globalVar.pizzaCount, inline: true },
            { name: 'Pasta Count', value: globalVar.pastaCount, inline: true },
            { name: 'Cake Count', value: globalVar.cakeCount, inline: true },
            { name: 'Cookie Count', value: globalVar.cookieCount, inline: true },
            { name: 'Sandwich Count', value: globalVar.sandwichCount, inline: true },
            { name: 'Fish Fillet Count', value: globalVar.fishCount, inline: true }
        )
        .setTimestamp()
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`);

        message.channel.send(globalEmbed);
        
    }
}