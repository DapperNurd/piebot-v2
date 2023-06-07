const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonBrownies = ["blondie", "M&M brownie", "chocolate frosted brownie", "fudge chocolate brownie", "triple chocolate chunk brownie", "walnut brownie", "peanut butter brownie", "mint chocolate brownie", "coconut brownie", "nutella brownie"
];

const uncommonBrownies = ["raspberry cheesecake brownie", "cookies and cream brownies", "crumb coffee brownies", "cookie dough brownies", "espresso brownie", "salted caramel brownie", "cream cheese brownie"
];

const rareBrownies = ["tiramisu brownie", "s'mores brownie", "marshmallow crunch brownie", "peppermit brownie", "pecan praline brownie", "caramel pretzel brownie"
];

const legendaryBrownies = ["Cosmic Brownie", "special 🌿🌱 brownie"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy", "homemade"];
const negAdjectives = ["day-old", "overcooked", "undercooked"];

const browniePhrases = ["Beeble baked a batch of her [BROWNIE ADJ] [BROWNIE]s, just for [USER]!",
    "Here, [USER], Beeble wants you to have [AN] [BROWNIE ADJ] [BROWNIE].",
    "Lucky day! Beeble presents [USER] with a plate of [BROWNIE ADJ] [BROWNIE]s alongside a nice, cool glass of milk.",
    "[USER] found a tin of [BROWNIE ADJ] [BROWNIE]s left out with a note from Beeble saying to help yourself. So kind!",
    "Beeble is testing a new recipe and wants [USER] to try her [BROWNIE ADJ] [BROWNIE]."];

const cosmicPhrase = "Beeble got a box of [BROWNIE ADJ] [BROWNIE]s from the store, and she let [USER] have one.";
const specialPhrase = "Beeble baked a batch of her secret [BROWNIE ADJ] [BROWNIE]s for [USER]...";

module.exports = {
    name: 'brownie',
    description: "this is a brownie command!",
    commonBrownies,
    uncommonBrownies,
    rareBrownies,
    legendaryBrownies,
    run: async (commandSent, message, args, client) => {

        const brownieCountVar = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => { // if the guild was not found in the list, in the rare case that piebot goes to a new server
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
                    trashCount: 0,
                    brownieCount: 0
                });

                newGuild.save() // adds the guild to the list
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('This server was not in my database. I have added it, please retype the command.');
            }
        });

        const userUniqueCounts = await User.findOne({
            userID: message.author.id // if the user is not found in the database
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
                    trashCount: 0,
                    brownieCount: 0
                });

                newUser.save() // adds the user to the database with 0's for all numbers
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('You were not in my database. I have added you, commands should work now.');
            }
        });

        var userBrownieCount = userUniqueCounts.brownieCount;
        userBrownieCount++;

        const globalVar = await GlobalCount.findOne({
            globalID: "global"
        }, (err, guild) => { // this should never happen, but if no global database is found it will create a new one
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
                    trashCount: 0,
                    brownieCount: 0
                });

                newGlobal.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('No global database found, creating now.');
            }
        });

        var brownieCountNum = brownieCountVar.brownieCount;
        brownieCountNum++;

        var globalBrownieCount = globalVar.brownieCount;
        globalBrownieCount++;

        var browniePerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 51): // 50% (1 to 50 )
                brownie = commonCakes[Math.floor(Math.random() * commonBrownies.length)];
                break;
            case (randomNum < 91): // 40% ( 51 to 90 )
                brownie = uncommonCakes[Math.floor(Math.random() * uncommonBrownies.length)];
                break;
            case (randomNum < 100): // 9% ( 91 to 99 )
                brownie = rareCakes[Math.floor(Math.random() * rareBrownies.length)];
                break;
            case (randomNum >= 100): // 1% ( 100 )
                brownie = legendaryCakes[Math.floor(Math.random() * legendaryBrownies.length)];
                break;
            default:
                brownie = commonCakes[Math.floor(Math.random() * commonBrownies.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var brownieAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100

        var plural = "a"
        if(brownieAdj == "overcooked" || brownieAdj == "undercooked") { plural = "an" };

        var phrase = browniePhrases[Math.floor(Math.random() * browniePhrases.length)];

        if(brownie == "Cosmic Brownie") { phrase = cosmicPhrase; }
        if(brownie == "special 🌿🌱 brownie") { phease = specialPhrase; }

        phrase = phrase.replace('[USER]', commandPerson);
        phrase = phrase.replace('[BROWNIE ADJ]', newAdj);
        phrase = phrase.replace('[BROWNIE]', newItem);
        phrase = phrase.replace('[AN]', plural);

        if(sorryRand > 92) {
            var sendText = `Sorry, ${browniePerson}, but I couldn't resist. I ate your ${brownieAdj} ${brownie}. There have been ${brownieCountNum} cakes given out on ${message.guild.name}.`
        } else {
            var sendText = `${phrase} Beeble has given out ${brownieCountNum} muffins on ${message.guild.name}.`
        }

        message.channel.send(sendText).then(function (botSentMessage) {

            if(brownieCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await brownieCountVar.updateOne({
            brownieCount: brownieCountNum
        })

        await globalVar.updateOne({
            brownieCount: globalBrownieCount
        })

        await userUniqueCounts.updateOne({
            brownieCount: userBrownieCount
        })

    }
}
