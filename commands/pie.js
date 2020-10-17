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
                    pizzaCount: 0
                });

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('This server was not in my database. I have added it, please retype the command.').then(m=> m.delete({timeout:10000}));
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
                    pizzaCount: 0
                });

                newUser.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('You were not in my database. I have added you, please retype the command.').then(m=> m.delete({timeout:10000}));
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
                    pizzaCount: 0
                });

                newGlobal.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send('No global database found, creating now.').then(m=> m.delete({timeout:10000}));
            }
        });

        var pieCountNum = pieCountVar.pieCount;
        pieCountNum++;
        var globalPieCount = globalVar.pieCount;
        globalPieCount++;

        var piePerson = (args.length > 0) ? args[0] : message.author;

        var randomNum = Math.floor(Math.random() * 100) + 1;
        switch (true) {
            case (randomNum < 55):
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
        var the = (message.guild.name.toLowerCase().startsWith("the")) ? " " : " the "
        if(sorryRand > 95) {
            var sendText = `Sorry, ${piePerson}, but I couldn't resist. I ate your \`${pieAdj} ${newPie}\`. There have been ${pieCountNum} pies given out on ${message.guild.name}.`
        } else if(message.content.split(" ")[0].toLowerCase() == "!pie") {
            var sendText = `Here, ${piePerson}! Kim wants you to have a slice of her \`${pieAdj} ${newPie}\`! There have been ${pieCountNum} pies given out on ${message.guild.name}.`
        } else if(message.content.split(" ")[0].toLowerCase() == "!pierate" ) {
            var sendText = `Arrrgh, ${piePerson}! Kim wants ye to have a slice of 'er \`${pieAdj} ${newPie}\`! There 'ave been ${pieCountNum} pie given out on${the}${message.guild.name}.`
        }
        message.channel.send(sendText).then(function (botSentMessage) {

            if(pieCountNum.toString().includes("69")) {
                botSentMessage.react("😏");
            }
            if(newPie == " prickly pear pie") {
                botSentMessage.react("🌵");
            }
            if(newPie == " pecan pie" && message.author.id.toString() == "307350352594862080") {
                botSentMessage.react("😂");
            }
            if(newPie == " pecan pie" && (piePerson.toLowerCase() == "kecatas" || piePerson.toLowerCase() == "kec" || piePerson.toLowerCase() == "cactus")) {
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
