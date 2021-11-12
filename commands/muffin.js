const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonMuffins = ["banana nut muffin", "blueberry muffin", "lemon poppy seed muffin", "coconut muffin", "oatmeal muffin", "raspberry muffin"
];

const uncommonMuffins = ["chocolate chip muffin", "cornbread muffin", "pumpkin muffin", "coffee cake muffin", "peanut butter muffin", "maple walnut muffin", "pecan muffin"
];

const rareMuffins = ["chocolate chunk muffin", "apple cinnamon muffin", "snickerdoodle muffin"
];

const legendaryMuffins = [`Kecatas' "special" muffin`, "drudanae muffin", "muffin time"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"]
const negAdjectives = ["day-old", "overcooked"];

const muffinPhrases = ["Here, [USER]! Kecatas wants you to have one of his [MUFFIN ADJ] [MUFFIN]s!",
    "[USER], you have stumbled upon Kecatas's stash of [MUFFIN ADJ] [MUFFIN]s. He won't know if you take just one, right?",
    "From the kitchen you can smell that Kecatas has prepared a batch of [MUFFIN ADJ] [MUFFIN]s. He offers [USER] one. What a good guy!",
    "Kecatas spent all morning baking a dozen [MUFFIN ADJ] [MUFFIN]s and wants you to try one, [USER]!",
    "Muffin Master Kecatas is testing a new recipe of [MUFFIN ADJ] [MUFFIN]s and gives you one to try. How does it taste, [USER]?"];

module.exports = {
    name: 'muffin',
    description: "this is a muffin command!",
    commonMuffins,
    uncommonMuffins,
    rareMuffins,
    legendaryMuffins,
    run: async (message, args, client) => {

        const muffinCountVar = await Guild.findOne({
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

        var userMuffinCount = userUniqueCounts.muffinCount;
        userMuffinCount++;

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

        var muffinCountNum = muffinCountVar.muffinCount;
        muffinCountNum++;

        var globalMuffinCount = globalVar.muffinCount;
        globalMuffinCount++;

        var muffinPerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 50):
                newMuffin = commonMuffins[Math.floor(Math.random() * commonMuffins.length)];
                break;
            case (randomNum < 95):
                newMuffin = uncommonMuffins[Math.floor(Math.random() * uncommonMuffins.length)];
                break;
            case (randomNum < 100):
                newMuffin = rareMuffins[Math.floor(Math.random() * rareMuffins.length)];
                break;
            case (randomNum >= 100):
                newMuffin = legendaryMuffins[Math.floor(Math.random() * legendaryMuffins.length)];
                break;
            default:
                newMuffin = commonMuffins[Math.floor(Math.random() * commonMuffins.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var muffinAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var phrase = muffinPhrases[Math.floor(Math.random() * muffinPhrases.length)];
        phrase = phrase.replace('[USER]', muffinPerson);
        phrase = phrase.replace('[MUFFIN ADJ]', muffinAdj);
        phrase = phrase.replace('[MUFFIN]', newMuffin);

        var sendText = "wowee";
        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100
        if(sorryRand > 92) {
            sendText = `Sorry, ${muffinPerson}, but I couldn't resist. I ate your ${muffinAdj} ${newMuffin}. There have been ${muffinCountNum} muffins given out on ${message.guild.name}.`
        } else {
            sendText = `${phrase} Kec has given out ${muffinCountNum} muffins on ${message.guild.name}.`
        }

        if(newMuffin == "muffin time") {
            sendText = "https://tenor.com/view/muffin-time-the-muffin-song-muffin-clock-gif-15999617";
        }

        message.channel.send(sendText).then(function (botSentMessage) {

            if(muffinCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await muffinCountVar.updateOne({
            muffinCount: muffinCountNum
        })

        await globalVar.updateOne({
            muffinCount: globalMuffinCount
        })

        await userUniqueCounts.updateOne({
            muffinCount: userMuffinCount
        })

    }
}
