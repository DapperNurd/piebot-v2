const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonPotatoes = ["mashed potatoes", "french fries", "baked potato", "hash browns", "tater tots"
];

const uncommonPotatoes = ["loaded potato skins", "potato chips", "roasted potatoes", "potato salad", "cheesy potatoes"
];

const rarePotatoes = ["potato gnocchi", "potato pancakes", "potato bread", "potato soup"
];

const legendaryPotatoes = ["pocket potatoes (courtesy of Boneless)"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"];
const negAdjectives = ["day-old", "overcooked"];

module.exports = {
    name: 'potato',
    description: "this is a potato command!",
    commonPotatoes,
    uncommonPotatoes,
    rarePotatoes,
    legendaryPotatoes,
    run: async (message, args, client) => {

        const potatoCountVar = await Guild.findOne({
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

        var userPotatoCount = userUniqueCounts.potatoCount;
        userPotatoCount++;

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

        var potatoCountNum = potatoCountVar.potatoCount;
        potatoCountNum++;

        var globalPotatoCount = globalVar.potatoCount;
        globalPotatoCount++;

        var potatoPerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 55):
                potato = commonPotatoes[Math.floor(Math.random() * commonPotatoes.length)];
                break;
            case (randomNum < 95):
                potato = uncommonPotatoes[Math.floor(Math.random() * uncommonPotatoes.length)];
                break;
            case (randomNum < 100):
                potato = rarePotatoes[Math.floor(Math.random() * rarePotatoes.length)];
                break;
            case (randomNum >= 100):
                potato = legendaryPotatoes[Math.floor(Math.random() * legendaryPotatoes.length)];
                break;
            default:
                potato = commonPotatoes[Math.floor(Math.random() * commonPotatoes.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var potatoAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100

        var plural = (potato == "baked potato") ? "a" : "some"

        if(sorryRand > 95) {
            var sendText = `Sorry, ${potatoPerson}, but I couldn't resist. I ate your ${potatoAdj} ${potato}. There have been ${potatoCountNum} potatoes given out on ${message.guild.name}.`
        } else {
            var sendText = `Here, ${potatoPerson}! Nurd wants you to have ${plural} ${potatoAdj} ${potato}! There have been ${potatoCountNum} potatoes given out on ${message.guild.name}.`
        }

        if(message.content.split(" ")[0].toLowerCase().substring(1) == "tater") {
            var taterRandom = Math.floor(Math.random() * 100) + 1;
            if(taterRandom > 98) {
                sendText = 'https://tenor.com/view/cute-cars-finding-disney-pixar-gif-7294652'
            }
        }
        message.channel.send(sendText).then(function (botSentMessage) {

            if(potatoCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await potatoCountVar.updateOne({
            potatoCount: potatoCountNum
        })

        await globalVar.updateOne({
            potatoCount: globalPotatoCount
        })

        await userUniqueCounts.updateOne({
            potatoCount: userPotatoCount
        })

    }
}
