const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonCreams = ["vanilla ice cream", "chocolate ice cream", "strawberry ice cream", "mint chocolate-chip ice cream", "orange sherbet", 
    "coffee ice cream", "peanut butter ice cream", "neapolitan ice cream", "cookie dough ice cream", "cookies n' cream ice cream", "chocolate-chip ice cream"
];

const uncommonCreams = ["rocky road ice cream", "birthday cake ice cream", "tiger ice cream", "vanilla bean ice cream", "maple-nut ice cream", 
    "chocolate peanut butter ice cream", "pistachio ice cream", "peppermint ice cream", "cotton candy ice cream", "rainbow sherbet", "pumpkin pie ice cream"
];

const rareCreams = ["fudge brownie ice cream", "strawberry cheesecake ice cream", "salted caramel ice cream", "moose tracks ice cream", 
    "pina colada ice cream", "rum raisin ice cream" 
];

const legendaryCreams = ["pɹɐzzᴉlq uǝǝnb ʎɹᴉɐp"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"]
const negAdjectives = ["freezer burnt", "melted"];

module.exports = {
    name: 'icecream',
    description: "this is an icecream command!",
    commonCreams,
    uncommonCreams,
    rareCreams,
    legendaryCreams,
    run: async (message, args, client) => {

        const iceCreamCountVar = await Guild.findOne({
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

        var userIceCreamCount = userUniqueCounts.iceCreamCount;
        userIceCreamCount++;

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

        var iceCreamCountNum = iceCreamCountVar.iceCreamCount;
        iceCreamCountNum++;
        var globalIceCreamCount = globalVar.iceCreamCount;
        globalIceCreamCount++;

        var iceCreamPerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 50):
                newCream = commonCreams[Math.floor(Math.random() * commonCreams.length)];
                break;
            case (randomNum < 95):
                newCream = uncommonCreams[Math.floor(Math.random() * uncommonCreams.length)];
                break;
            case (randomNum < 100):
                newCream = rareCreams[Math.floor(Math.random() * rareCreams.length)];
                break;
            case (randomNum >= 100):
                newCream = legendaryCreams[Math.floor(Math.random() * legendaryCreams.length)];
                break;
            default:
                newCream = commonCreams[Math.floor(Math.random() * commonCreams.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var iceCreamAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        
        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100
        if(sorryRand > 95) {
            var sendText = `Sorry, ${iceCreamPerson}, but I couldn't resist. I ate your ${iceCreamAdj} ${newCream}. There have been ${iceCreamCountNum} ice creams given out on ${message.guild.name}.`
        } else {
            var sendText = `Here, ${iceCreamPerson}! Meadfetcher wants you to have some ${iceCreamAdj} ${newCream}! There have been ${iceCreamCountNum} ice creams given out on ${message.guild.name}.`
        }
        if(newCream == "pɹɐzzᴉlq uǝǝnb ʎɹᴉɐp") {
            var legRandom = Math.floor(Math.random() * 100) + 1;
            if(legRandom > 50) {
                var sendText = `Oh no ${iceCreamPerson}! I dropped your melted dairy queen blizzard! There have been ${iceCreamCountNum} ice creams given out on ${message.guild.name}.`
            }
        }
        message.channel.send(sendText).then(function (botSentMessage) {

            if(iceCreamCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await iceCreamCountVar.updateOne({
            iceCreamCount: iceCreamCountNum
        })

        await globalVar.updateOne({
            iceCreamCount: globalIceCreamCount
        })

        await userUniqueCounts.updateOne({
            iceCreamCount: userIceCreamCount
        })

    }
}
