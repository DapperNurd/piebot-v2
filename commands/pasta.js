const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonPastas = ["spaghetti", "fettucine alfredo", "mac and cheese", "chicken alfredo", "spaghetti with meatballs", "baked ziti", "five cheese ravioli"
];

const uncommonPastas = ["shrimp alfredo", "seafood alfredo", "creamy tomato penne", "chicken rigatoni", "macaroni salad", "beef stroganoff", "stuffed shells"
];

const rarePastas = ["lasagna", "trennete al pesto", "carbonara", "drunken noodles", "chow mein"
];

const legendaryPastas = ["Kraft blue box", "Chef Boyardee Beef Ravioli"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"];
const negAdjectives = ["day-old", "overcooked"];

module.exports = {
    name: 'pasta',
    description: "this is a pasta command!",
    commonPastas,
    uncommonPastas,
    rarePastas,
    legendaryPastas,
    run: async (commandSent, message, args, client) => {

        const pastaCountVar = await Guild.findOne({
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
                    trashCount: 0
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
                    trashCount: 0
                });

                newUser.save() // adds the user to the database with 0's for all numbers
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('You were not in my database. I have added you, commands should work now.');
            }
        });

        var userPastaCount = userUniqueCounts.pastaCount;
        userPastaCount++;

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
                    trashCount: 0
                });

                newGlobal.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('No global database found, creating now.');
            }
        });

        var pastaCountNum = pastaCountVar.pastaCount;
        pastaCountNum++;

        var globalPastaCount = globalVar.pastaCount;
        globalPastaCount++;

        var pastaPerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 50):
                pasta = commonPastas[Math.floor(Math.random() * commonPastas.length)];
                break;
            case (randomNum < 95):
                pasta = uncommonPastas[Math.floor(Math.random() * uncommonPastas.length)];
                break;
            case (randomNum < 100):
                pasta = rarePastas[Math.floor(Math.random() * rarePastas.length)];
                break;
            case (randomNum >= 100):
                pasta = legendaryPastas[Math.floor(Math.random() * legendaryPastas.length)];
                break;
            default:
                pasta = commonPastas[Math.floor(Math.random() * commonPastas.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var pastaAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100

        //var plural = (pasta == "baked potato") ? "a" : "some"
        var plural = "some"

        if(sorryRand > 92) {
            var sendText = `Sorry, ${pastaPerson}, but I couldn't resist. I ate your ${pastaAdj} ${pasta}. There have been ${pastaCountNum} pasta dishes given out on ${message.guild.name}.`
        } else {
            var sendText = `Here, ${pastaPerson}! Nurd wants you to have ${plural} ${pastaAdj} ${pasta}! There have been ${pastaCountNum} pasta dishes given out on ${message.guild.name}.`
        }

        message.channel.send(sendText).then(function (botSentMessage) {

            if(pastaCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await pastaCountVar.updateOne({
            pastaCount: pastaCountNum
        })

        await globalVar.updateOne({
            pastaCount: globalPastaCount
        })

        await userUniqueCounts.updateOne({
            pastaCount: userPastaCount
        })

    }
}
