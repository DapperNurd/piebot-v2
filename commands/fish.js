const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonFish = ["carp", "bass", "trout", "tilapia", "catfish", "anchovy", "cod", "spanish mackeral", "bluefish", "crappie", "redfish", "mullet", "ruby splashtail"
];

const uncommonFish = ["cobia", "flounder", "red snapper", "king mackeral", "ladyfish", "largemouth bass", "tuna", "sunfish", "halibut", "pompano", "salmon", "sunny splashtail"
];

const rareFish = ["grouper", "alligator gar", "lionfish", "swordfish", "mahimahi", "wahoo", "clownfish", "indigo splashtail"
];

const legendaryFish = ["Holy Mackerel", "fish sticks and custard", "umber splashtail"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"]
const negAdjectives = ["day-old", "overcooked"];

module.exports = {
    name: 'fish',
    description: "this is a fish command!",
    commonFish,
    uncommonFish,
    rareFish,
    legendaryFish,
    run: async (message, args, client) => {

        const fishCountVar = await Guild.findOne({
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

        var userFishCount = userUniqueCounts.fishCount;
        userFishCount++;

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

        var fishCountNum = fishCountVar.fishCount;
        fishCountNum++;

        var globalFishCount = globalVar.fishCount;
        globalFishCount++;

        var fishPerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 50):
                newFish = commonFish[Math.floor(Math.random() * commonFish.length)];
                break;
            case (randomNum < 95):
                newFish = uncommonFish[Math.floor(Math.random() * uncommonFish.length)];
                break;
            case (randomNum < 100):
                newFish = rareFish[Math.floor(Math.random() * rareFish.length)];
                break;
            case (randomNum >= 100):
                newFish = legendaryFish[Math.floor(Math.random() * legendaryFish.length)];
                break;
            default:
                newFish = commonFish[Math.floor(Math.random() * commonFish.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var fishAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100
        if(sorryRand > 92) {
            switch (true) {
                case (randomNum < 55):
                    newFish2 = commonFish[Math.floor(Math.random() * commonFish.length)];
                    break;
                case (randomNum < 95):
                    newFish2 = uncommonFish[Math.floor(Math.random() * uncommonFish.length)];
                    break;
                case (randomNum < 100):
                    newFish2 = rareFish[Math.floor(Math.random() * rareFish.length)];
                    break;
                case (randomNum >= 100):
                    newFish2 = legendaryFish[Math.floor(Math.random() * legendaryFish.length)];
                    break;
                default:
                    newFish2 = commonFish[Math.floor(Math.random() * commonFish.length)];
            }
            var sendText = `You just got catfished, ${fishPerson}! Your ${fishAdj} ${newFish} is actually a ${newFish2}. There have been ${fishCountNum} fish fillets given out on ${message.guild.name}.`
        } else if(sorryRand > 91) {
            var sendText = `Sorry, ${fishPerson}, but I couldn't resist. I ate your ${fishAdj} ${newFish}. There have been ${fishCountNum} fish fillets given out on ${message.guild.name}.`
        } else {
            var sendText = `Here, ${fishPerson}! Valyx the Florida Man wants you to have some ${fishAdj} ${newFish}! There have been ${fishCountNum} fish fillets given out on ${message.guild.name}.`
        }

        message.channel.send(sendText).then(function (botSentMessage) {

            if(fishCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }

        });

        await fishCountVar.updateOne({
            fishCount: fishCountNum
        })

        await globalVar.updateOne({
            fishCount: globalFishCount
        })

        await userUniqueCounts.updateOne({
            fishCount: userFishCount
        })

    }
}
