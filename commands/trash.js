const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

// 13 categories

const totalItems = 210;

const food = [];
const foodAdj = [];

const drinks = [];
const drinksAdj = [];

const clothing = [];
const clothingAdj = [];

const electronics = [];
const electronicsAdj = [];

const toys = [];
const toysAdj = [];

const toiletries = [];
const toiletriesAdj = [];

const wtf = [];
const wtfAdj = [];

const tools = [];
const toolsAdj = [];

const kitchen = [];
const kitchenAdj = [];

const collectibles = [];
const collectiblesAdj = [];

const animals = [];
const animalsAdj = [];

const furniture = [];
const furnitureAdj = [];

const misc = [];

// only here for viewing purposes, will delete when done
const trashPhrases = ["Here, [USER]! Kecatas wants you to have one of his [MUFFIN ADJ] [MUFFIN]s!",
    "[USER], you have stumbled upon Kecatas's stash of [MUFFIN ADJ] [MUFFIN]s. He won't know if you take just one, right?",
    "From the kitchen you can smell that Kecatas has prepared a batch of [MUFFIN ADJ] [MUFFIN]s. He offers [USER] one. What a good guy!",
    "Kecatas spent all morning baking a dozen [MUFFIN ADJ] [MUFFIN]s and wants you to try one, [USER]!",
    "Muffin Master Kecatas is testing a new recipe of [MUFFIN ADJ] [MUFFIN]s and gives you one to try. How does it taste, [USER]?"];

// list of phrases that piebot can pick from when sending a message
const phrases = [ "[USER] goes rummaging through the garbage and finds [ITEM]. They have found [COUNT] things in the trash.",
                  "[USER] dug through Trash's special dumpster and found [item]. they have found [COUNT] pieces of trash. you gonna pay for that?",
                  "[USER] dove into the dumpster for the [COUNT] time and found [ITEM].",
                  "[USER] accidentally knocked over a trash can and [ITEM] fell out. They have found [COUNT] things in the trash.",
                  "Trashed has graced [USER] with [ITEM] from his personal bin. They have gathered [COUNT] pieces of trash." ];

const specialPhrase = "[USER] went dumpster diving and found [ITEM]! how did they even find it? they have found [COUNT] items collecting garbage. He wont be happy when he finds out.";

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

        // taking the user's item count from the database and adding one to it locally
        var userTrashCount = userUniqueCounts.trashCount;
        userTrashCount++;

        // taking the servers's item count from the database and adding one to it locally
        var trashCountNum = trashCountVar.trashCount;
        trashCountNum++;

        // taking the global item count from the database and adding one to it locally
        var globalTrashCount = globalVar.trashCount;
        globalTrashCount++;

        // sets person response to either the user or the first argument, depending on the existance of the argument
        var trashPerson = (args.length > 0) ? args[0] : message.author;

        var newTrash;
        var trashAdj;


        // FIGURE OUT CHANCE TO HAVE NO ADJECTIVE


        // generates a number from 1 to 14 to pick one of the 14 categories
        var randomCategory = Math.floor(Math.random() * 13) + 1;
        switch (randomCategory) {
            case (1):
                newTrash = food[Math.floor(Math.random() * food.length)];
                trashAdj = foodAdj[Math.floor(Math.random() * foodAdj.length)];
                break;
            case (2):
                newTrash = drinks[Math.floor(Math.random() * drinks.length)];
                trashAdj = drinksAdj[Math.floor(Math.random() * drinksAdj.length)];
                break;
            case (3):
                newTrash = clothing[Math.floor(Math.random() * clothing.length)];
                trashAdj = clothingAdj[Math.floor(Math.random() * clothingAdj.length)];
                break;
            case (4):
                newTrash = electronics[Math.floor(Math.random() * electronics.length)];
                trashAdj = electronicsAdj[Math.floor(Math.random() * electronicsAdj.length)];
                break;
            case (5):
                newTrash = toys[Math.floor(Math.random() * toys.length)];
                trashAdj = toysAdj[Math.floor(Math.random() * toysAdj.length)];
                break;
            case (6):
                newTrash = toiletries[Math.floor(Math.random() * toiletries.length)];
                trashAdj = toiletriesAdj[Math.floor(Math.random() * toiletriesAdj.length)];
                break;
            case (7):
                newTrash = wtf[Math.floor(Math.random() * wtf.length)];
                trashAdj = wtfAdj[Math.floor(Math.random() * wtfAdj.length)];
                break;
            case (8):
                newTrash = tools[Math.floor(Math.random() * tools.length)];
                trashAdj = toolsAdj[Math.floor(Math.random() * toolsAdj.length)];
                break;
            case (9):
                newTrash = kitchen[Math.floor(Math.random() * kitchen.length)];
                trashAdj = kitchenAdj[Math.floor(Math.random() * kitchenAdj.length)];
                break;
            case (10):
                newTrash = collectibles[Math.floor(Math.random() * collectibles.length)];
                trashAdj = collectiblesAdj[Math.floor(Math.random() * collectiblesAdj.length)];
                break;
            case (11):
                newTrash = animals[Math.floor(Math.random() * animals.length)];
                trashAdj = animalsAdj[Math.floor(Math.random() * animalsAdj.length)];
                break;
            case (12):
                newTrash = furniture[Math.floor(Math.random() * furniture.length)];
                trashAdj = furnitureAdj[Math.floor(Math.random() * furniture.Adjlength)];
                break;
            case (13):
                newTrash = misc[Math.floor(Math.random() * misc.length)];
                // misc is adjective-less
                trashAdj = "";
                break;
            default:
                // using toys as the default because it has the most items, but it should never actually be called this way with the way the random generator works
                newTrash = toys[Math.floor(Math.random() * toys.length)];
                trashAdj = toys[Math.floor(Math.random() * toys.length)];
        }

        // sets the phrase to either a random phrase or the special phrase if the trash gotten was the secret stash
        var phrase = (newTrash == "Trash's secret stash") ? specialPhrase : trashPhrases[Math.floor(Math.random() * trashPhrases.length)];

        // replaces all the placeholders in the phrase with the proper information
        phrase = phrase.replace('[USER]', trashPerson);
        phrase = phrase.replace('[ADJ]', trashAdj);
        phrase = phrase.replace('[ITEM]', newTrash);
        phrase = phrase.replace('[COUNT]', trashCountNum);

        var sendText = `${phrase} Kec has given out ${trashCountNum} muffins on ${message.guild.name}.`;

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
