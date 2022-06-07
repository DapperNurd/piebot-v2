const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonTrash = ["banana nut muffin", "blueberry muffin", "lemon poppy seed muffin", "coconut muffin", "oatmeal muffin", "raspberry muffin"
];

const uncommonTrash = ["chocolate chip muffin", "cornbread muffin", "pumpkin muffin", "coffee cake muffin", "peanut butter muffin", "maple walnut muffin", "pecan muffin"
];

const rareTrash = ["chocolate chunk muffin", "apple cinnamon muffin", "snickerdoodle muffin"
];

const legendaryTrash = [`Kecatas' "special" muffin`, "drudanae muffin", "muffin time"];

const trashPhrases = ["Here, [USER]! Kecatas wants you to have one of his [MUFFIN ADJ] [MUFFIN]s!",
    "[USER], you have stumbled upon Kecatas's stash of [MUFFIN ADJ] [MUFFIN]s. He won't know if you take just one, right?",
    "From the kitchen you can smell that Kecatas has prepared a batch of [MUFFIN ADJ] [MUFFIN]s. He offers [USER] one. What a good guy!",
    "Kecatas spent all morning baking a dozen [MUFFIN ADJ] [MUFFIN]s and wants you to try one, [USER]!",
    "Muffin Master Kecatas is testing a new recipe of [MUFFIN ADJ] [MUFFIN]s and gives you one to try. How does it taste, [USER]?"];

module.exports = {
    name: 'trash',
    description: "this is a trash command!",
    run: async (commandSent, message, args, client) => {

        const trashCountVar = await Guild.findOne({
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
                    fishCount: 0,
                    cakeCount: 0,
                    cookieCount: 0,
                    pastaCount: 0,
                    sandwichCount: 0,
                    trashCount: 0
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
                    fishCount: 0,
                    cakeCount: 0,
                    cookieCount: 0,
                    pastaCount: 0,
                    sandwichCount: 0,
                    trashCount: 0
                });

                newUser.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('You were not in my database. I have added you, commands should work now.');
            }
        });

        var userTrashCount = userUniqueCounts.trashCount;
        userTrashCount++;

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
                    fishCount: 0,
                    cakeCount: 0,
                    cookieCount: 0,
                    pastaCount: 0,
                    sandwichCount: 0,
                    trashCount: 0
                });

                newGlobal.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('No global database found, creating now.');
            }
        });

        var trashCountNum = trashCountVar.trashCount;
        trashCountNum++;

        var globalTrashCount = globalVar.trashCount;
        globalTrashCount++;

        var trashPerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 50):
                newTrash = commonTrash[Math.floor(Math.random() * commonTrash.length)];
                break;
            case (randomNum < 95):
                newTrash = uncommonTrash[Math.floor(Math.random() * uncommonTrash.length)];
                break;
            case (randomNum < 100):
                newTrash = rareTrash[Math.floor(Math.random() * rareTrash.length)];
                break;
            case (randomNum >= 100):
                newTrash = legendaryTrash[Math.floor(Math.random() * legendaryTrash.length)];
                break;
            default:
                newTrash = commonTrash[Math.floor(Math.random() * commonTrash.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var trashAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var phrase = trashPhrases[Math.floor(Math.random() * trashPhrases.length)];
        phrase = phrase.replace('[USER]', trashPerson);
        phrase = phrase.replace('[MUFFIN ADJ]', trashAdj);
        phrase = phrase.replace('[MUFFIN]', newTrash);

        var sendText = "wowee";
        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100
        if(sorryRand > 92) {
            sendText = `Sorry, ${trashPerson}, but I couldn't resist. I ate your ${trashAdj} ${newTrash}. There have been ${trashCountNum} muffins given out on ${message.guild.name}.`
        } else {
            sendText = `${phrase} Kec has given out ${trashCountNum} muffins on ${message.guild.name}.`
        }

        if(newTrash == "muffin time") {
            sendText = "https://tenor.com/view/muffin-time-the-muffin-song-muffin-clock-gif-15999617";
        }

        message.channel.send(sendText).then(function (botSentMessage) {

            if(trashCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await trashCountVar.updateOne({
            trashCount: trashCountNum
        })

        await globalVar.updateOne({
            trashCount: globalTrashCount
        })

        await userUniqueCounts.updateOne({
            trashCount: userTrashCount
        })

    }
}
