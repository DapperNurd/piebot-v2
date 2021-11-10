const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

const commonPies = ["pumpkin pie", "coconut cream pie", "banana cream pie", "strawberry rhubarb pie", "chocolate cream pie", "blueberry pie", "ice cream pie",
    "peach pie", "pear pie", "chicken pot pie", "cranberry pie", "pineapple pie", "turtle pie", "chocolate hazelnut pie", "mixed berry pie", "chestnut pie"
];

const uncommonPies = ["apple pie", "cherry pie", "key lime pie", "lemon meringue pie", "blackberry pie", "raspberry pie", "pecan pie",
    "strawberry pie", "french silk pie", "custard pie", "chocolate peanut butter pie", "butterscotch pie", "mississippi mud pie", "caramel apple pie", 
    "cookies and cream pie","boysenberry pie", "shepherd's pie", "mincemeat pie"
];

const rarePies = ["cheesecake", "prickly pear pie", "apple pie à la mode", "blackberry pie à la mode", "cherry pie à la mode",
    "raspberry pie à la mode", "boysenberry pie à la mode"
];

const legendaryPies = ["creampie", "cow pie", "cutie pie"];

const adjectives = ["delicious", "tasty", "scrumptious", "heavenly", "delectable", "delightful", "yummy"]
const negAdjectives = ["day-old", "overcooked"];

const piePhrases = ["Here, [USER]! Kim wants you to have a slice of her [PIE ADJ] [PIE]!",
    "Using artisnal skill and experience, Master Chef Kim has prepared [A] [PIE ADJ] [PIE] for you, [USER]!",
    "With incredible skill and hand-picked ingredients, Kim has created [A] [PIE ADJ] [PIE] for [USER]!",
    "[USER], you see [A] [PIE ADJ] [PIE] sitting on the table in Kim's kitchen. You decide to steal it, you sly fox.",
    "Using her own patented recipe, Kim made a [PIE ADJ] [PIE] just for you, [USER]! Wow, it's delicious!",
    "[A] [PIE ADJ] [PIE] floats down from the heavens and into [USER][S] hands. You can tell that it was prepared by Kim with love." ];

module.exports = {
    name: 'pie',
    description: "this is a pie command!",
    commonPies,
    uncommonPies,
    rarePies,
    legendaryPies,
    run: async (message, args, client) => {

        const pieCountVar = await Guild.findOne({
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

        var userPieCount = userUniqueCounts.pieCount;
        userPieCount++;

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

        var pieCountNum = pieCountVar.pieCount;
        pieCountNum++;
        var globalPieCount = globalVar.pieCount;
        globalPieCount++;

        var piePerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 50):
                newPie = commonPies[Math.floor(Math.random() * commonPies.length)];
                break;
            case (randomNum < 95):
                newPie = uncommonPies[Math.floor(Math.random() * uncommonPies.length)];
                break;
            case (randomNum < 100):
                newPie = rarePies[Math.floor(Math.random() * rarePies.length)];
                break;
            case (randomNum >= 100):
                newPie = legendaryPies[Math.floor(Math.random() * legendaryPies.length)];
                break;
            default:
                newPie = commonPies[Math.floor(Math.random() * commonPies.length)];
        }

        var adjRandom = Math.floor(Math.random() * 100) + 1;
        var pieAdj = (adjRandom > 10) ? adjectives[Math.floor(Math.random() * adjectives.length)] : negAdjectives[Math.floor(Math.random() * negAdjectives.length)];

        var sorryRand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100

        var phrase = piePhrases[Math.floor(Math.random() * piePhrases.length)];
        phrase = phrase.replace('[USER]', piePerson);
        phrase = phrase.replace('[PIE ADJ]', pieAdj);
        phrase = phrase.replace('[PIE]', newPie);
        if(phrase.includes('[A]')) {
            var a = (pieAdj.startsWith("a") || pieAdj.startsWith("e") || pieAdj.startsWith("i") || pieAdj.startsWith("o") || pieAdj.startsWith("u")) ? "an" : "a";
            if(phrase.charAt(0) == "[") {
                phrase = phrase.replace('[A]', a.charAt(0).toUpperCase() + a.slice(1));
            } else {
                phrase = phrase.replace('[A]', a);
            }
        }
        if(phrase.includes('[S]')) {
            if(piePerson.toString().toLowerCase().endsWith('s')) {
                phrase = phrase.replace('[S]', "'");
            } else {
                phrase = phrase.replace('[S]', "'s");
            }
        }

        var the = (message.guild.name.toLowerCase().startsWith("the")) ? " " : " the "

        var sendText = "wowee";
        if(sorryRand > 90) {
            sendText = `Sorry, ${piePerson}, but I couldn't resist. I ate your ${pieAdj} ${newPie}. There have been ${pieCountNum} pies given out on ${message.guild.name}.`
        } else if(message.content.split(" ")[0].toLowerCase().substring(1) == "pie") {
            sendText = `${phrase} There have been ${pieCountNum} pies given out on ${message.guild.name}.`
        } else if(message.content.split(" ")[0].toLowerCase().substring(1) == "pierate") {
            sendText = `Arrrgh, ${piePerson}! Captain Moosebeard wants ye to have a slice of 'is ${pieAdj} ${newPie}! There 'ave been ${pieCountNum} pie given out on${the}${message.guild.name}.`
        }

        message.channel.send(sendText).then(function (botSentMessage) {

            if(pieCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }
            if(newPie == "prickly pear pie") {
                botSentMessage.react("🌵");
            }
            if(newPie == "pecan pie" && message.author.id.toString() == "307350352594862080") {
                botSentMessage.react("😂");
            }
            if(newPie == "pecan pie" && (piePerson.toLowerCase() == "kecatas" || piePerson.toLowerCase() == "kec" || piePerson.toLowerCase() == "cactus")) {
                botSentMessage.react("😂");
            }

        });

        await pieCountVar.updateOne({
            pieCount: pieCountNum
        })

        await globalVar.updateOne({
            pieCount: globalPieCount
        })

        await userUniqueCounts.updateOne({
            pieCount: userPieCount
        })

    }
}
