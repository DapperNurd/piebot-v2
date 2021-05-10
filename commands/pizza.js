const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonPizzas = ["cheese", "pepperoni", "sausage", "all-meat", "hawaiian", "margherita", "veggie"
];

const uncommonPizzas = ["chicago-style deep dish", "breakfast", "buffalo chicken", "feta cheese and salami", "pineapple pepperoni"
];

const rarePizzas = ["BBQ chicken", "chicken alfredo", "loaded baked-potato", "chocolate chip cookie",  "verde chicken enchilada", "taco quesadilla"
];

const legendaryPizzas = ["boneless", "hotpocket™️"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"]
const negAdjectives = ["day-old", "overcooked", "frozen"];

const crusts = ["deep dish", "thin crust", "stuffed crust"];

const pizzaPhrases = ["Here, [USER]! ItalianStallion wants you to have a slice of her [PIZZA ADJ] [CRUST][PIZZA] pizza!",
    "[USER], you enter ItalianStallions pizzaria and order up a slice of [PIZZA ADJ] [CRUST][PIZZA] pizza. Yum!",
    "ItalianStallion has chosen only the finest ingredients for her [PIZZA ADJ] [CRUST][PIZZA] pizza. She looks around the room and choses [USER] to have the first slice!",
    "[USER], donning your pizza thief costume, you sneak into ItalianStallions kitchen and make off with her [PIZZA ADJ] [CRUST][PIZZA] pizza. You're a menace!",
    "The smell of ItalianStallion's [PIZZA ADJ] [CRUST][PIZZA] pizza fills your nose, [USER]. She offers you a slice!"
    ];

module.exports = {
    name: 'pizza',
    description: "this is a pizza command!",
    commonPizzas,
    uncommonPizzas,
    rarePizzas,
    legendaryPizzas,
    crusts,
    run: async (message, args, client) => {

        const pizzaCountVar = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) console.error(err);
            if(!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    pieCount: 0,
                    muffinCount: 0,
                    potatoCount: 0,
                    iceCreamCount: 0,
                    pizzaCount: 0,
                    fishCount: 0
                });

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('This server was not in my database. I have added it, please retype the command.');
            }
        });

        const userUniqueCounts = await User.findOne({
            userID: message.author.id
        }, (err, user) => {
            if(err) console.error(err);
            if(!user) {
                const newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    userName: message.author.tag,
                    pieCount: 0,
                    muffinCount: 0,
                    potatoCount: 0,
                    iceCreamCount: 0,
                    pizzaCount: 0,
                    fishCount: 0
                });

                newUser.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('You were not in my database. I have added you, commands should work now.');
            }
        });

        var userPizzaCount = userUniqueCounts.pizzaCount;
        userPizzaCount++;

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

                return message.channel.send('No global database found, creating now.');
            }
        });

        var pizzaCountNum = pizzaCountVar.pizzaCount;
        pizzaCountNum++;
        var globalIceCreamCount = globalVar.pizzaCount;
        globalIceCreamCount++;

        var pizzaPerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 55):
                newPizza = commonPizzas[Math.floor(Math.random() * commonPizzas.length)];
                break;
            case (randomNum < 95):
                newPizza = uncommonPizzas[Math.floor(Math.random() * uncommonPizzas.length)];
                break;
            case (randomNum < 100):
                newPizza = rarePizzas[Math.floor(Math.random() * rarePizzas.length)];
                break;
            case (randomNum >= 100):
                newPizza = legendaryPizzas[Math.floor(Math.random() * legendaryPizzas.length)];
                break;
            default:
                newPizza = commonPizzas[Math.floor(Math.random() * commonPizzas.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var pizzaAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var crustType = "";
        if(newPizza != "chicago-style deep dish" && newPizza != "breakfast" && newPizza != "chocolate chip cookie" && newPizza != "hotpocket™️") {
            var crustRandom = Math.floor(Math.random() * 100) + 1;
            if(crustRandom > 85) {
                crustType = crusts[Math.floor(Math.random() * crusts.length)]+" ";
            }
        }
        
        var phrase = pizzaPhrases[Math.floor(Math.random() * pizzaPhrases.length)];
        phrase = phrase.replace('[USER]', pizzaPerson);
        phrase = phrase.replace('[PIZZA ADJ]', pizzaAdj);
        phrase = phrase.replace('[PIZZA]', newPizza);
        phrase = phrase.replace('[CRUST]', crustType);

        var sendText = "woweee";
        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100
        if(sorryRand > 90) {
            sendText = `Sorry, ${pizzaPerson}, but I couldn't resist. I ate your ${pizzaAdj} ${crustType}${newPizza} pizza. There have been ${pizzaCountNum} pizzas given out on Twitch.`
        } else {
            sendText = `${phrase} ItalianStallion has given out ${pizzaCountNum} pizzas on Twitch.`
        }

        client.say(channel, sendText);

        message.channel.send(sendText).then(function (botSentMessage) {

            if(pizzaCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await pizzaCountVar.updateOne({
            pizzaCount: pizzaCountNum
        })

        await globalVar.updateOne({
            pizzaCount: globalIceCreamCount
        })

        await userUniqueCounts.updateOne({
            pizzaCount: userPizzaCount
        })

    }
}
