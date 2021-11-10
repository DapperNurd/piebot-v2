const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonSandwiches = ["ham and cheese", "grilled cheese", "BLT", "roast beef", "turkey", "peanut butter and jelly", "bologna"
];

const uncommonSandwiches = ["panini", "club", "reuben", "cuban", "tuna salad", "egg salad", "french dip", "meatball", "peanut butter and honey", "pastrami"
];

const rareSandwiches = ["cheeseburger", "philly cheesesteak", "patty melt", "chicken"
];

const legendarySandwiches = ["peanut butter and banana", "hot dog"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"];
const negAdjectives = ["day-old", "dry"];

module.exports = {
    name: 'sandwich',
    description: "this is a sandwich command!",
    commonSandwiches,
    uncommonSandwiches,
    rareSandwiches,
    legendarySandwiches,
    run: async (message, args, client) => {

        const sandwichCountVar = await Guild.findOne({
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

        var userSandwichCount = userUniqueCounts.sandwichCount;
        userSandwichCount++;

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

        var sandwichCountNum = sandwichCountVar.sandwichCount;
        sandwichCountNum++;

        var globalSandwichCount = globalVar.sandwichCount;
        globalSandwichCount++;

        var sandwichPerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 50):
                sandwich = commonSandwiches[Math.floor(Math.random() * commonSandwiches.length)];
                break;
            case (randomNum < 95):
                sandwich = uncommonSandwiches[Math.floor(Math.random() * uncommonSandwiches.length)];
                break;
            case (randomNum < 100):
                sandwich = rareSandwiches[Math.floor(Math.random() * rareSandwiches.length)];
                break;
            case (randomNum >= 100):
                sandwich = legendarySandwiches[Math.floor(Math.random() * legendarySandwiches.length)];
                break;
            default:
                sandwich = commonSandwiches[Math.floor(Math.random() * commonSandwiches.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var sandwichAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100

        var plural = "a"
        if(plural == "a" && sandwichAdj == "overcooked") { plural = "an" };

        var sandwichLabel = " sandwich";
        if(sandwich == "cheeseburger" || sandwich == "philly cheesesteak" || sandwich == "patty melt" || sandwich == "hot dog") {
            sandwichLabel = "";
        } else if (sandwich == "meatball") {
            sandwichLabel = " sub";
        }

        if(sorryRand > 95) {
            var sendText = `Sorry, ${sandwichPerson}, but I couldn't resist. I ate your ${sandwichAdj} ${sandwich}${sandwichLabel}. There have been ${sandwichCountNum} sandwiches given out on ${message.guild.name}.`
        } else {
            var sendText = `Here, ${sandwichPerson}! Manton wants you to have ${plural} ${sandwichAdj} ${sandwich}${sandwichLabel}! There have been ${sandwichCountNum} sandwiches given out on ${message.guild.name}.`
        }

        message.channel.send(sendText).then(function (botSentMessage) {

            if(sandwichCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await sandwichCountVar.updateOne({
            sandwichCount: sandwichCountNum
        })

        await globalVar.updateOne({
            sandwichCount: globalSandwichCount
        })

        await userUniqueCounts.updateOne({
            sandwichCount: userSandwichCount
        })

    }
}
