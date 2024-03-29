const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonCookies = ["chocolate chip cookie", "sugar cookie", "oatmeal raisin cookie", "snickerdoodle cookie", "double chocolate chip cookie", "white chocolate macadamia cookie"
];

const uncommonCookies = ["molasses cookie", "shortbread cookie", "peanut butter cookie", "gingerbread cookie", "toffee chunk cookie", "M&M cookie", "caramel popcorn cookie", "maple pecan cookie", "granola cluster cookie"
];

const rareCookies = ["biscotti cookie", "cookie dough", "fortune cookie", "peanut butter chocolate chip cookie", "macaron", "thin mint", "samoa"
];

const legendaryCookies = ["double stuff oreo"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"];
const negAdjectives = ["day-old", "overcooked"];

module.exports = {
    name: 'cookie',
    description: "this is a cookie command!",
    commonCookies,
    uncommonCookies,
    rareCookies,
    legendaryCookies,
    run: async (commandSent, message, args, client) => {

        const cookieCountVar = await Guild.findOne({
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

        var userCookieCount = userUniqueCounts.cookieCount;
        userCookieCount++;

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

        var cookieCountNum = cookieCountVar.cookieCount;
        cookieCountNum++;

        var globalCookieCount = globalVar.cookieCount;
        globalCookieCount++;

        var cookiePerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 51): // 50% (1 to 50 )
                cookie = commonCookies[Math.floor(Math.random() * commonCookies.length)];
                break;
            case (randomNum < 91): // 40% ( 51 to 90 )
                cookie = uncommonCookies[Math.floor(Math.random() * uncommonCookies.length)];
                break;
            case (randomNum < 100): // 9% ( 91 to 99 )
                cookie = rareCookies[Math.floor(Math.random() * rareCookies.length)];
                break;
            case (randomNum >= 100): // 1% ( 100 )
                cookie = legendaryCookies[Math.floor(Math.random() * legendaryCookies.length)];
                break;
            default:
                cookie = commonCookies[Math.floor(Math.random() * commonCookies.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var cookieAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100

        var plural = (cookie == "cookie dough") ? "some" : "a"
        if(plural == "a" && cookieAdj == "overcooked") { plural = "an" };

        if(sorryRand > 92) {
            var sendText = `Sorry, ${cookiePerson}, but I couldn't resist. I ate your ${cookieAdj} ${cookie}. There have been ${cookieCountNum} cookies given out on ${message.guild.name}.`
        } else {
            var sendText = `Here, ${cookiePerson}! Burnzip wants you to have ${plural} ${cookieAdj} ${cookie}! There have been ${cookieCountNum} cookies given out on ${message.guild.name}.`
        }

        message.channel.send(sendText).then(function (botSentMessage) {

            if(cookieCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await cookieCountVar.updateOne({
            cookieCount: cookieCountNum
        })

        await globalVar.updateOne({
            cookieCount: globalCookieCount
        })

        await userUniqueCounts.updateOne({
            cookieCount: userCookieCount
        })

    }
}
