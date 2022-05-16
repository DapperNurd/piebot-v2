const Discord = require('discord.js');
const mongoose = require('mongoose');
const GlobalCount = require('../models/globalCount');
const pieMenu = require('./pie');
const muffinMenu = require('./muffin');
const potatoMenu = require('./potato');
const iceCreamMenu = require('./icecream')
const pizzaMenu = require('./pizza');
const fishMenu = require('./fish');
const pastaMenu = require('./pasta');
const cakeMenu = require('./cake');
const cookieMenu = require('./cookie');
const sandwichMenu = require('./sandwich');

module.exports = {
    name: 'menu',
    description: "this is a menu command!",
    run: async (message, args, client, index) => {
        if(args.length < 1) message.channel.send("Please specify which menu to view. \n**Examples**\n\`!menu pie\`\n\`!menu all\`").then(function (sentMessage) {
            sentMessage.react("🥧");
            sentMessage.react("827060748983074856");
            sentMessage.react("🥔");
            sentMessage.react("🍦");
            sentMessage.react("🍕");
            sentMessage.react("🍝")
            sentMessage.react("🍰")
            sentMessage.react("🍪")
            sentMessage.react("🥪")
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
                    pastaCount: 0,
                    cakeCount: 0,
                    cookieCount: 0,
                    sandwichCount: 0,
                    fishCount: 0
                });

                newGlobal.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('No global database found, creating now.');
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
            { name: 'Common Pies (49%)', value: pieMenu.commonPies },
            { name: 'Uncommon Pies (45%)', value: pieMenu.uncommonPies },
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
            { name: 'Common Muffins (49%)', value: muffinMenu.commonMuffins },
            { name: 'Uncommon Muffins (45%)', value: muffinMenu.uncommonMuffins },
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
            { name: 'Common Potatoes (49%)', value: potatoMenu.commonPotatoes },
            { name: 'Uncommon Potatoes (45%)', value: potatoMenu.uncommonPotatoes },
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
            { name: 'Common Ice Creams (49%)', value: iceCreamMenu.commonCreams },
            { name: 'Uncommon Ice Creams (45%)', value: iceCreamMenu.uncommonCreams },
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
            { name: 'Common Pizzas (49%)', value: pizzaMenu.commonPizzas },
            { name: 'Uncommon Pizzas (45%)', value: pizzaMenu.uncommonPizzas },
            { name: 'Rare Pizzas (5%)', value: pizzaMenu.rarePizzas },
            { name: 'Legendary Pizzas (1%)', value: pizzaMenu.legendaryPizzas },
            { name: 'Special Crusts (15%)', value: pizzaMenu.crusts },
        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()


        // PASTA MENU
        const totalPastaCount = pastaMenu.commonPastas.length + pastaMenu.uncommonPastas.length + pastaMenu.rarePastas.length + pastaMenu.legendaryPastas.length;
        const pastaEmbed = new Discord.MessageEmbed()
        .setColor('#e6d28c')
        .setTitle(`Pasta Menu`)
        .setDescription(`Number of Pastas: ${totalPastaCount}`)
        .setAuthor(`Global Pasta Count: ${globalVar.pastaCount}`)
        .addFields(
            { name: 'Common Pastas (49%)', value: pastaMenu.commonPastas },
            { name: 'Uncommon Pastas (45%)', value: pastaMenu.uncommonPastas },
            { name: 'Rare Pastas (5%)', value: pastaMenu.rarePastas },
            { name: 'Legendary Pastas (1%)', value: pastaMenu.legendaryPastas },

        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()


        // CAKE MENU
        const totalCakeCount = cakeMenu.commonCakes.length + cakeMenu.uncommonCakes.length + cakeMenu.rareCakes.length + cakeMenu.legendaryCakes.length;
        const cakeEmbed = new Discord.MessageEmbed()
        .setColor('#f1b3f2')
        .setTitle(`Cake Menu`)
        .setDescription(`Number of Cakes: ${totalCakeCount}`)
        .setAuthor(`Global Cake Count: ${globalVar.cakeCount}`)
        .addFields(
            { name: 'Common Cakes (49%)', value: cakeMenu.commonCakes },
            { name: 'Uncommon Cakes (45%)', value: cakeMenu.uncommonCakes },
            { name: 'Rare Cakes (5%)', value: cakeMenu.rareCakes },
            { name: 'Legendary Cakes (1%)', value: cakeMenu.legendaryCakes },
        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()


        // COOKIE MENU
        const totalCookieCount = cookieMenu.commonCookies.length + cookieMenu.uncommonCookies.length + cookieMenu.rareCookies.length + cookieMenu.legendaryCookies.length;
        const cookieEmbed = new Discord.MessageEmbed()
        .setColor('#d68c42')
        .setTitle(`Cookie Menu`)
        .setDescription(`Number of Cookies: ${totalCookieCount}`)
        .setAuthor(`Global Cookie Count: ${globalVar.cookieCount}`)
        .addFields(
            { name: 'Common Cookies (49%)', value: cookieMenu.commonCookies },
            { name: 'Uncommon Cookies (45%)', value: cookieMenu.uncommonCookies },
            { name: 'Rare Cookies (5%)', value: cookieMenu.rareCookies },
            { name: 'Legendary Cookies (1%)', value: cookieMenu.legendaryCookies },
        )   
        .setFooter(`PiebotV2 by ${client.users.cache.get("189510396569190401").username}`)
        .setTimestamp()


        // SANDWICH MENU
        const totalSandwichCount = sandwichMenu.commonSandwiches.length + sandwichMenu.uncommonSandwiches.length + sandwichMenu.rareSandwiches.length + sandwichMenu.legendarySandwiches.length;
        const sandwichEmbed = new Discord.MessageEmbed()
        .setColor('#d6bf4b')
        .setTitle(`Sandwich Menu`)
        .setDescription(`Number of Sandwiches: ${totalSandwichCount}`)
        .setAuthor(`Global Sandwich Count: ${globalVar.sandwichCount}`)
        .addFields(
            { name: 'Common Sandwiches (49%)', value: sandwichMenu.commonSandwiches },
            { name: 'Uncommon Sandwiches (45%)', value: sandwichMenu.uncommonSandwiches },
            { name: 'Rare Sandwiches (5%)', value: sandwichMenu.rareSandwiches },
            { name: 'Legendary Sandwiches (1%)', value: sandwichMenu.legendarySandwiches },
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
            { name: 'Common Fish (49%)', value: fishMenu.commonFish },
            { name: 'Uncommon Fish (45%)', value: fishMenu.uncommonFish },
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
            else if(menu == "cake" || menu == "cakes") {
                message.author.send(cakeEmbed);
                message.react("📬");
            }
            else if(menu == "pasta" || menu == "pastas") {
                message.author.send(pastaEmbed);
                message.react("📬");
            }
            else if(menu == "cookie" || menu == "cookies" || menu == "cooky") {
                message.author.send(cookieEmbed);
                message.react("📬");
            }
            else if(menu == "sandwich" || menu == "sandwiches" || menu == "sammy" || menu == "sammie" || menu == "sammies") {
                message.author.send(sandwichEmbed);
                message.react("📬");
            }
            else if(menu == "fish" || menu == "fishes" || menu == "fishs") {
                message.author.send(fishEmbed);
                message.react("📬");
            }
            else if(menu == "all" || menu == "full" || menu == "total") {
                message.author.send(pieEmbed);
                message.author.send(muffinEmbed);
                message.author.send(potatoEmbed);
                message.author.send(iceCreamEmbed);
                message.author.send(pizzaEmbed);
                message.author.send(pastaEmbed);
                message.author.send(cakeEmbed);
                message.author.send(cookieEmbed);
                message.author.send(sandwichEmbed);
                message.author.send(fishEmbed);

                message.react("📬");
            } 
            else {
                message.channel.send("Menu not recognized.").then(m=> m.delete({timeout:8000}));
            }
        }
    }
}
