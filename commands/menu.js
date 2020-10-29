const Discord = require('discord.js');
const mongoose = require('mongoose');
const GlobalCount = require('../models/globalCount');
const pieMenu = require('./pie');
const muffinMenu = require('./muffin');
const potatoMenu = require('./potato');
const iceCreamMenu = require('./icecream')
const pizzaMenu = require('./pizza');
const fishMenu = require('./fish');

module.exports = {
    name: 'menu',
    description: "this is a menu command!",
    run: async (message, args, client) => {
        if(args.length < 1) message.channel.send("Please specify which menu to view. \n\`Example: !menu pie\`").then(function (sentMessage) {
            sentMessage.react("🥧");
            sentMessage.react("766932300410912780");
            sentMessage.react("🥔");
            sentMessage.react("🍦");
            sentMessage.react("🍕");
            sentMessage.react("🐟");
            sentMessage.delete({timeout:45000});
        });

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
                    fishCount: 0
                });

                newGlobal.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('No global database found, creating now.').then(m=> m.delete({timeout:10000}));
            }
        });

        // PIE MENU
        const totalPieCount = pieMenu.commonPies.length + pieMenu.uncommonPies.length + pieMenu.rarePies.length + pieMenu.legendaryPies.length;
        const pieEmbed = new Discord.MessageEmbed()
        .setColor('#FF1111')
        .setTitle(`Pie Menu`)
        .setDescription(`Number of Pies: ${totalPieCount}`)
        .setAuthor(`Global Pie Count: ${globalVar.pieCount}`)
        .addFields(
            { name: 'Common Pies (54%)', value: pieMenu.commonPies },
            { name: 'Uncommon Pies (40%)', value: pieMenu.uncommonPies },
            { name: 'Rare Pies (5%)', value: pieMenu.rarePies },
            { name: 'Legendary Pies (1%)', value: pieMenu.legendaryPies },
        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()


        // MUFFIN MENU
        const totalMuffinCount = muffinMenu.commonMuffins.length + muffinMenu.uncommonMuffins.length + muffinMenu.rareMuffins.length + muffinMenu.legendaryMuffins.length;
        const muffinEmbed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle(`Muffin Menu`)
        .setDescription(`Number of Muffins: ${totalMuffinCount}`)
        .setAuthor(`Global Muffin Count: ${globalVar.muffinCount}`)
        .addFields(
            { name: 'Common Muffins (54%)', value: muffinMenu.commonMuffins },
            { name: 'Uncommon Muffins (40%)', value: muffinMenu.uncommonMuffins },
            { name: 'Rare Muffins (5%)', value: muffinMenu.rareMuffins },
            { name: 'Legendary Muffins (1%)', value: muffinMenu.legendaryMuffins },
        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()


        // POTATO MENU
        const totalPotatoCount = potatoMenu.commonPotatoes.length + potatoMenu.uncommonPotatoes.length + potatoMenu.rarePotatoes.length + potatoMenu.legendaryPotatoes.length;
        const potatoEmbed = new Discord.MessageEmbed()
        .setColor('#A0522D')
        .setTitle(`Potato Menu`)
        .setDescription(`Number of Potatoes: ${totalPotatoCount}`)
        .setAuthor(`Global Potato Count: ${globalVar.potatoCount}`)
        .addFields(
            { name: 'Common Potatoes (54%)', value: potatoMenu.commonPotatoes },
            { name: 'Uncommon Potatoes (40%)', value: potatoMenu.uncommonPotatoes },
            { name: 'Rare Potatoes (5%)', value: potatoMenu.rarePotatoes },
            { name: 'Legendary Potatoes (1%)', value: potatoMenu.legendaryPotatoes },
        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()


        // ICE CREAM MENU
        const totalIceCreamCount = iceCreamMenu.commonCreams.length + iceCreamMenu.uncommonCreams.length + iceCreamMenu.rareCreams.length + iceCreamMenu.legendaryCreams.length;
        const iceCreamEmbed = new Discord.MessageEmbed()
        .setColor('#33bbff')
        .setTitle(`Ice Cream Menu`)
        .setDescription(`Number of Ice Creams: ${totalIceCreamCount}`)
        .setAuthor(`Global Ice Cream Count: ${globalVar.iceCreamCount}`)
        .addFields(
            { name: 'Common Ice Creams (54%)', value: iceCreamMenu.commonCreams },
            { name: 'Uncommon Ice Creams (40%)', value: iceCreamMenu.uncommonCreams },
            { name: 'Rare Ice Creams (5%)', value: iceCreamMenu.rareCreams },
            { name: 'Legendary Ice Creams (1%)', value: iceCreamMenu.legendaryCreams },
        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()


        // PIZZA MENU
        const totalPizzaCount = pizzaMenu.commonPizzas.length + pizzaMenu.uncommonPizzas.length + pizzaMenu.rarePizzas.length + pizzaMenu.legendaryPizzas.length;
        const pizzaEmbed = new Discord.MessageEmbed()
        .setColor('#ffcc2b')
        .setTitle(`Pizza Menu`)
        .setDescription(`Number of Pizzas: ${totalPizzaCount}`)
        .setAuthor(`Global Pizza Count: ${globalVar.pizzaCount}`)
        .addFields(
            { name: 'Common Pizzas (54%)', value: pizzaMenu.commonPizzas },
            { name: 'Uncommon Pizzas (40%)', value: pizzaMenu.uncommonPizzas },
            { name: 'Rare Pizzas (5%)', value: pizzaMenu.rarePizzas },
            { name: 'Legendary Pizzas (1%)', value: pizzaMenu.legendaryPizzas },
            { name: 'Special Crusts (15%)', value: pizzaMenu.crusts },
        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()


        // FISH MENU
        const totalFishCount = fishMenu.commonFish.length + fishMenu.uncommonFish.length + fishMenu.rareFish.length + fishMenu.legendaryFish.length;
        const fishEmbed = new Discord.MessageEmbed()
        .setColor('#cad8d7')
        .setTitle(`Fish Menu`)
        .setDescription(`Number of Fish: ${totalFishCount}`)
        .setAuthor(`Global Fish Count: ${globalVar.fishCount}`)
        .addFields(
            { name: 'Common Fish (54%)', value: fishMenu.commonFish },
            { name: 'Uncommon Fish (40%)', value: fishMenu.uncommonFish },
            { name: 'Rare Fish (5%)', value: fishMenu.rareFish },
            { name: 'Legendary Fish (1%)', value: fishMenu.legendaryFish }
        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()

        if(args[0]) {
            const menu = args[0];
            if(menu == "pie" || menu == "pies") {
                message.author.send(pieEmbed);
                message.react("📬");
            }
            else if(menu == "muffin" || menu == "muffin") {
                message.author.send(muffinEmbed);
                message.react("📬");
            }
            else if(menu == "potato" || menu == "potatos" || menu == "potatoes" || menu == "tater" || menu == "taters") {
                message.author.send(potatoEmbed);
                message.react("📬");
            }
            else if(menu == "ice" || menu == "icecream" || menu == "cream") {
                message.author.send(iceCreamEmbed);
                message.react("📬");
            }
            else if(menu == "pizza" || menu == "pizzas") {
                message.author.send(pizzaEmbed);
                message.react("📬");
            } 
            else if(menu == "fish" || menu == "fishes"|| menu == "fishs") {
                message.author.send(fishEmbed);
                message.react("📬");
            }
            else if(menu == "all" || menu == "full"|| menu == "total") {
                message.author.send(pieEmbed);
                message.author.send(muffinEmbed);
                message.author.send(potatoEmbed);
                message.author.send(iceCreamEmbed);
                message.author.send(pizzaEmbed);
                message.author.send(fishEmbed);

                message.react("📬");
            } 
            else {
                message.channel.send("Menu not recognized.").then(m=> m.delete({timeout:8000}));
            }
        }
    }
}