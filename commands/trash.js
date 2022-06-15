const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

// 13 categories

const totalItems = 210;

const food = [  "[AN] [ADJ] apple core",
                "[AN] [ADJ] banana peel",
                "[AN] [ADJ] pickle",
                "15 lbs of [ADJ] cheese",
                "[AN] [ADJ] pineapple",
                "[AN] [ADJ] pizza crust",
                "some [ADJ] chicken bones",
                "[AN] [ADJ] corn dog",
                "[AN] [ADJ] hard-boiled egg",
                "[AN] [ADJ] apple pie",
                "some [ADJ] cheese curds",
                "some [ADJ] salami",
                "some [ADJ] pastromi",
                "some [ADJ] donut holes",
                "some [ADJ] anchovies",
                "[AN] [ADJ] seasonal pie",
                "a box of [ADJ] chocolates",
                "[AN] [ADJ] avocado",
                "a bag of [ADJ] doritos"    ];
const foodAdj = [   "rotten",
                    "fresh",
                    "moldy",
                    "petrified",
                    "smelly",
                    "mushy",
                    "greasy",
                    "wet",
                    "aged",
                    "spoiled",
                    "expired"   ];

const drinks = [    "[AN] [ADJ] gallon of milk",
                    "[AN] [ADJ] bottle of water",
                    "a carton of [ADJ] chocolate milk",
                    "[AN] [ADJ] can of tomato juice",
                    "[AN] [ADJ] can of beer",
                    "[AN] [ADJ] capri-sun",
                    "[AN] [ADJ] carton of apple juice",
                    "[AN] [ADJ] 5-hour energy",
                    "[AN] [ADJ] Chug Jug",
                    "[AN] [ADJ] can of pepsi",
                    "[AN] [ADJ] can of coca cola",
                    "[AN] [ADJ] bottle of whiskey",
                    "[AN] [ADJ] keg of beer",
                    "[AN] [ADJ] pumpkin spice latte",
                    "[AN] [ADJ] bottle of Mike's Hard Lemonade",
                    "[AN] [ADJ] jug of maple syrup",
                    "[AN] [ADJ] can of Red Bull",
                    "[AN] [ADJ] can of Dr. Pepper",
                    "[AN] [ADJ] can of Mountain Dew",
                    "[AN] [ADJ] bottle of Fireball Whiskey"     ];
const drinksAdj = [     "spoiled",
                        "half-drank",
                        "ice cold",
                        "room-temperature",
                        "empty",
                        "piping-hot",
                        "stinky",
                        "aged",
                        "leaking",
                        "expired"     ];

const clothing = [  "[AN] [ADJ] MAGA hat",
                    "some [ADJ] underwear",
                    "[AN] [ADJ] Abba t-shirt",
                    "[AN] [ADJ] thong",
                    "[AN] [ADJ] XXXL jock strap",
                    "[AN] [ADJ] pair of crocs",
                    "[AN] [ADJ] bunny girl outfit",
                    "[AN] [ADJ] dragon furry suit",
                    "[AN] [ADJ] pair of socks",
                    "[AN] [ADJ] fanny pack ",
                    "[AN] [ADJ] cowboy hat",
                    "[AN] [ADJ] top hat",
                    "[AN] [ADJ] bow tie",
                    "[AN] [ADJ] helicopter hat",
                    "[AN] [ADJ] umbrella",
                    "[AN] [ADJ] lingerie",
                    "[AN] [ADJ] blanket",
                    "[AN] [ADJ] dog bed",
                    "[AN] [ADJ] mattress",
                    "[AN] [ADJ] pillow" ];
const clothingAdj = [   "ripped",
                        "clean",
                        "new",
                        "used",
                        "stinky",
                        "holey",
                        "dirty",
                        "stained",
                        "soaked",
                        "wet"   ];

const electronics = [   "[AN] [ADJ] ipad",
                        "[AN] [ADJ] game controller",
                        "[AN] [ADJ] RTX 3080",
                        "[AN] [ADJ] Morbius blu-ray disc",
                        "[AN] [ADJ] keyboard",
                        "[AN] [ADJ] USB-C cable",
                        "[AN] [ADJ] texas instruments calculator",
                        "[AN] [ADJ] printer",
                        "[AN] [ADJ] Ratatouille blu-ray disc",
                        "[AN] [ADJ] iPhone 4",
                        "[AN] [ADJ] copy of Windows XP",
                        "[AN] [ADJ] NES",
                        "[AN] [ADJ] atari 2600",
                        "six [ADJ] PS5s",
                        "[AN] [ADJ] copy of ET: the video game",
                        "[AN] [ADJ] car",
                        "[AN] [ADJ] GPS tracker",
                        "[AN] [ADJ] USB microphone" ];
const electronicsAdj = [    "pristine",
                            "broken",
                            "unopened",
                            "slightly-used",
                            "dirty",
                            "scuffed",
                            "fake",
                            "wet",
                            "bricked",
                            "modded",
                            "roughed-up"    ];

const toys = [  "six [ADJ] toy cars",
                "[AN] [ADJ] LED llama figure",
                "[AN] [ADJ] bubble blower",
                "[AN] [ADJ] tricyle",
                "[AN] [ADJ] yoyo",
                "[AN] [ADJ] Rubix cube",
                "[AN] [ADJ] model airplane",
                "[AN] [ADJ] remote-controlled car",
                "[AN] [ADJ] super soaker",
                "[AN] [ADJ] teddy bear",
                "a random assortment of [ADJ] legos",
                "[AN] [ADJ] baseball bat",
                "[AN] [ADJ] football",
                "[AN] [ADJ] bowling ball",
                "[AN] [ADJ] bowling pin",
                "1000 [ADJ] puzzle pieces",
                "10 [ADJ] puzzle pieces",
                "[AN] [ADJ] jump rope"  ];
const toysAdj = [   "broken",
                    "heavily-used",
                    "sticky",
                    "dirty",
                    "brand-new",
                    "well-worn",
                    "wet",
                    "scuffed",
                    "pristine",
                    "slimy"     ];

const toiletries = [    "[AN] [ADJ] toilet paper roll",
                        "[AN] [ADJ] toothbrush",
                        "some [ADJ] toenail clippers",
                        "[AN] [ADJ] toilet",
                        "[AN] [ADJ] hairbrush",
                        "[AN] [ADJ] comb",
                        "[AN] [ADJ] hair dryer",
                        "[AN] [ADJ] toothpaste bottle",
                        "[AN] [ADJ] bidet",
                        "[AN] [ADJ] nail file",
                        "[AN] [ADJ] lint roller",
                        "[AN] [ADJ] stick of deoderant",
                        "some [ADJ] dental floss",
                        "[AN] [ADJ] straight razor",
                        "[AN] [ADJ] rectal thermometer",
                        "[AN] [ADJ] toilet brush",
                        "[AN] [ADJ] COVID test kit",
                        "[AN] [ADJ] ShamWow"    ];
const toiletriesAdj = [ "brand-new",
                        "unused",
                        "dirty",
                        "used",
                        "clean",
                        "wet",
                        "crushed",
                        "smelly",
                        "slimy",
                        "lightly-used" ];

// These need to be lacking a space so the empty adjective does not cause a double space (the adjectives also end with a space)
const wtf = [   "[AN] [ADJ]sawed-off shotgun",
                "some [ADJ]uncut bank notes",
                "[AN] [ADJ]wad of $100 bills",
                "[AN] [ADJ]elephant tusk",
                "[AN] [ADJ]bomb",
                "[AN] [ADJ]gun",
                "[AN] [ADJ]bale of cannabis",
                "[AN] [ADJ]human hair",
                "[AN] [ADJ]24 carat diamond",
                "[AN] [ADJ]severed hand",
                "[AN] [ADJ]severed foot",
                "[AN] [ADJ]bar of gold",
                "[AN] [ADJ]Declaration of Independence",
                "[AN] [ADJ]Mona Lisa",
                "[AN] [ADJ]time machine",
                "[AN] [ADJ]copy of Half Life 3"    ];
const wtfAdj = [ "fake ", "real ", "" ];

const tools = [     "[AN] [ADJ] bucket",
                    "[AN] [ADJ] jackhammer",
                    "[AN] [ADJ] hand drill",
                    "some [ADJ] nails",
                    "some [ADJ] scissors",
                    "[AN] [ADJ] picnic table",
                    "[AN] [ADJ] bottle opener",
                    "[AN] [ADJ] tool box",
                    "[AN] [ADJ] nail gun",
                    "[AN] [ADJ] stapler",
                    "[AN] [ADJ] sledge hammer",
                    "[AN] [ADJ] bottle of glue",
                    "some [ADJ] flex tape",
                    "[AN] [ADJ] microscope",
                    "[AN] [ADJ] lockpick",
                    "[AN] [ADJ] shopping cart"     ];
const toolsAdj = [ "broken", "advanced", "old", "worn", "factory-new", "dirty" ];

const kitchen = [   "[AN] [ADJ] tubberware container",
                    "[AN] [ADJ] pot",
                    "[AN] [ADJ] whole oven",
                    "[AN] [ADJ] kitchen sink",
                    "[AN] [ADJ] silverware set",
                    "[AN] [ADJ] blender",
                    "[AN] [ADJ] refridgerator",
                    "[AN] [ADJ] meat cleaver",
                    "[AN] [ADJ] convection oven",
                    "[AN] [ADJ] crock pot",
                    "[AN] [ADJ] spoon",
                    "[AN] [ADJ] pressure cooker",
                    "[AN] [ADJ] glass jar",
                    "[AN] [ADJ] porcelain plate",
                    "[AN] [ADJ] tea cup",
                    "[AN] [ADJ] tea pot",
                    "[AN] [ADJ] spork",
                    "[AN] [ADJ] deep freezer",
                    "[AN] [ADJ] deep fryer"   ];
const kitchenAdj = [ "broken", "new", "old", "dirty", "clean", "shiny", "stinky" ];

const collectibles = [  "[AN] [ADJ] star wars lego death star set",
                        "a binder of [ADJ] holoraphic pokemon cards",
                        "[AN] [ADJ] back to the future lunchbox",
                        "[AN] [ADJ] saved by the bell lunchbox",
                        "a bag of [ADJ] silver dimes",
                        "[AN] [ADJ] Darth Vader action figure",
                        "[AN] [ADJ] Blockbuster member card",
                        "[AN] [ADJ] book of stamps",
                        "an assortment of [ADJ] Zippo lighters",
                        "a box full of [ADJ] postcards",
                        "[AN] [ADJ] copy of Marval Comics #1",
                        "[AN] [ADJ] Babe Ruth Topps baseball card",
                        "[AN] [ADJ] Honus Wagner baseball card",
                        "some [ADJ] tickets to BlizCon",
                        "[AN] [ADJ] Batmobile replica",
                        "[AN] [ADJ] Delorean",
                        "[AN] [ADJ] chunk of meteorite"  ];
const collectiblesAdj = [ "mint-condition", "pristine", "unkept", "dirty", "fake", "real" ];

const animals = [   "[AN] [ADJ] rat",
                    "[AN] [ADJ] raccoon",
                    "[AN] [ADJ] opossum",
                    "[AN] [ADJ] five-legged rat",
                    "a family of [ADJ] spiders",
                    "[AN] [ADJ] pigeon",
                    "[AN] [ADJ] seagull",
                    "[AN] [ADJ] coyote",
                    "[AN] [ADJ] muskrat",
                    "[AN] [ADJ] vulture",
                    "two [ADJ] cockroaches",
                    "[AN] [ADJ] squirrel",
                    "a hoard of [ADJ] centipedes",
                    "[AN] [ADJ] trash panda",
                    "[AN] [ADJ] cat"    ];
const animalsAdj = [    "rabid",
                        "domesticated",
                        "feral",
                        "questionable",
                        "undead",
                        "wet",
                        "obese",
                        "huge",
                        "scary",
                        "friendly",
                        "cute",
                        "nice",
                        "small"    ];

const furniture = [     "[AN] [ADJ] couch",
                        "[AN] [ADJ] gaming chair",
                        "[AN] [ADJ] recliner",
                        "[AN] [ADJ] rocking chair",
                        "[AN] [ADJ] ottoman",
                        "[AN] [ADJ] coo-coo clock ",
                        "[AN] [ADJ] computer desk",
                        "[ADJ] accoustic wall panels",
                        "[AN] [ADJ] Ikea table",
                        "[AN] [ADJ] coffee table",
                        "[AN] [ADJ] entertainment center",
                        "[AN] [ADJ] bar stool",
                        "[AN] [ADJ] book shelf",
                        "[AN] [ADJ] futon",
                        "[AN] [ADJ] fold-up chair",
                        "[AN] [ADJ] cradle",
                        "[AN] [ADJ] throne",
                        "[AN] [ADJ] bath chair",
                        "some [ADJ] Shungite"   ];
const furnitureAdj = [  "dusty",
                        "old",
                        "new",
                        "smelly",
                        "stained",
                        "broken"    ];

const misc = [  "Kim's burnt pies",
                "some chewed gum",
                "an empty pizza box",
                "some stranger's driver's license",
                "a school yearbook from 1997",
                "nothing",
                "a jar of mayo",
                "a gallon of lard",
                "a white chocolate twix",
                "trauma's beard trimmer",
                "Trash's secret stash",
                "a bag of toenails",
                "a bag of used cat liter",
                "some bottles of piss",
                "some prefilled vomit bags",
                "a picture of themself",
                "themself",
                "a particle accelerator",
                "a printed screenshot of a NFT",
                "the answer to life, universe and everything",
                "10 bags of cement"  ];

// list of phrases that piebot can pick from when sending a message
const phrases = [   "[USER] goes rummaging through the garbage and finds [ITEM]. There have been [COUNT] pieces of trash found on [SERVER].",
                    "[USER] dug through Trash's special dumpster and found [ITEM]. They should probably pay for that... There have been [COUNT] pieces of trash found on [SERVER].",,
                    "Trashed thought they heard [USER] sifting through his dumpster. They managed to sneak away with [ITEM] without getting caught. There have been [COUNT] pieces of trash found on [SERVER].",
                    "[USER] accidentally knocked over a trash can and [ITEM] fell out. There have been [COUNT] pieces of trash found on [SERVER].",
                    "Trashed has graced [USER] with [ITEM] from his personal bin. There have been [COUNT] pieces of trash found on [SERVER].",
                    "Uh, oh... [USER] was caught digging in a dumpster by the Police. They had [ITEM] removed from their person. There have been [COUNT] pieces of trash found on [SERVER].",
                    "It's trash day, and [USER] notices [ITEM] fall out of their neighbor's garbage can as the truck picks it up. There have been [COUNT] pieces of trash found on [SERVER].",
                    "In frustration, [USER] kicked over a trash bin and found [ITEM] as debris spewed everywhere! There have been [COUNT] pieces of trash found on [SERVER].",
                    "Walking home, [USER] was thrown into a dumpster by some thugs. Before crawling out they found [ITEM]. Their wallet may have been stolen but at least they take home a prize! There have been [COUNT] pieces of trash found on [SERVER]."   ];

const specialPhrase = "[USER] went dumpster diving and found [ITEM]! How did they even find it? Trash wont be happy when he finds out. There have been [COUNT] pieces of trash found on [SERVER].";

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

        var newTrash = "";
        var trashAdj = "";


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
                trashAdj = toysAdj[Math.floor(Math.random() * toysAdj.length)];
        }

        // Adds in the proper adjective if there is an adjective to add
        newTrash = newTrash.replace('[ADJ]', trashAdj);
        // For certain items, picks "an" or "a" to have proper grammar with the adjective following

        // sets the phrase to either a random phrase or the special phrase if the trash gotten was the secret stash
        var phrase = "";
        phrase = (newTrash == "Trash's secret stash") ? specialPhrase : phrases[Math.floor(Math.random() * phrases.length)];

        const channel = await client.channels.fetch('369001523453231105');
        //if(!newTrash) channel.send({content: newTrash});
        //if(typeof trashAdj !== "string") channel.send({content: trashAdj});
        //channel.send({content: phrase});

        
        var vowels = ("aeiouAEIOU");
        if(newTrash.includes("[AN]")) {
            if(vowels?.indexOf(trashAdj[0]) !== -1) { 
                newTrash = newTrash.replace('[AN]', "an");
            } else {
                newTrash = newTrash.replace('[AN]', "a");
            }
        }

        // replaces all the placeholders in the phrase with the proper information
        if(typeof phrase != "string") {
            phrase = phrase.replace('[USER]', trashPerson);
            phrase = phrase.replace('[ITEM]', newTrash);
            phrase = phrase.replace('[COUNT]', trashCountNum);
            phrase = phrase.replace('[SERVER]', message.guild.name)
        } else {
            channel.send({content: typeof phrase});
        }

        message.channel.send(phrase).then(function (botSentMessage) {

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
