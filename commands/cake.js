const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonCakes = ["chocolate cake", "vanilla cake", "carrot cake", "birthday cake", "spice cake", "coffee cake", "ice cream cake"
];

const uncommonCakes = ["red velvet cake", "strawberry shortcake", "coconut cake", "lemon cake", "pound cake", "pumpkin spice cake", "sponge cake", "pineapple upside down cake"
];

const rareCakes = ["cake pop", "dulce de leche cake", "chocolate lava cake", "tiramisu", "mexican chocolate cake"
];

const legendaryCakes = ["fruitcake", "pancake"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"];
const negAdjectives = ["day-old", "flourless", "overcooked"];

module.exports = {
    name: 'cake',
    description: "this is a cake command!",
    commonCakes,
    uncommonCakes,
    rareCakes,
    legendaryCakes,
    run: async (message, args, client, index) => {

        const cakeCountVar = await Guild.findOne({
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
                    sandwichCount: 0
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
                    sandwichCount: 0
                });

                newUser.save() // adds the user to the database with 0's for all numbers
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('You were not in my database. I have added you, commands should work now.');
            }
        });

        var userCakeCount = userUniqueCounts.cakeCount;
        userCakeCount++;

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
                    sandwichCount: 0
                });

                newGlobal.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('No global database found, creating now.');
            }
        });

        var cakeCountNum = cakeCountVar.cakeCount;
        cakeCountNum++;

        var globalCakeCount = globalVar.cakeCount;
        globalCakeCount++;

        var cakePerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 50):
                cake = commonCakes[Math.floor(Math.random() * commonCakes.length)];
                break;
            case (randomNum < 95):
                cake = uncommonCakes[Math.floor(Math.random() * uncommonCakes.length)];
                break;
            case (randomNum < 100):
                cake = rareCakes[Math.floor(Math.random() * rareCakes.length)];
                break;
            case (randomNum >= 100):
                cake = legendaryCakes[Math.floor(Math.random() * legendaryCakes.length)];
                break;
            default:
                cake = commonCakes[Math.floor(Math.random() * commonCakes.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var cakeAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100

        var plural = " slice of"
        if(cake == "pancake" || cake == "cake pop") {
            plural = "";
        }

        if(sorryRand > 92) {
            var sendText = `Sorry, ${cakePerson}, but I couldn't resist. I ate your${plural} ${cakeAdj} ${cake}. There have been ${cakeCountNum} cakes given out on ${message.guild.name}.`
        } else {
            var sendText = `Here, ${cakePerson}! Destronate wants you to have a${plural} ${cakeAdj} ${cake}! There have been ${cakeCountNum} cakes given out on ${message.guild.name}.`
        }

        message.channel.send(sendText).then(function (botSentMessage) {

            if(cakeCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await cakeCountVar.updateOne({
            cakeCount: cakeCountNum
        })

        await globalVar.updateOne({
            cakeCount: globalCakeCount
        })

        await userUniqueCounts.updateOne({
            cakeCount: userCakeCount
        })

    }
}
