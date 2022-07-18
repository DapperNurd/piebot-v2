const mongoose = require('mongoose');
const Guild = require('../models/guild');
const User = require('../models/user');
const GlobalCount = require('../models/globalCount');

// 13 categories

const totalItems = 210;

const food = [  "[AN] [newAdj] apple core",
                "[AN] [newAdj] banana peel",
                "[AN] [newAdj] pickle",
                "15 lbs of [newAdj] cheese",
                "[AN] [newAdj] pineapple",
                "[AN] [newAdj] pizza crust",
                "some [newAdj] chicken bones",
                "[AN] [newAdj] corn dog",
                "[AN] [newAdj] hard-boiled egg",
                "[AN] [newAdj] apple pie",
                "some [newAdj] cheese curds",
                "some [newAdj] salami",
                "some [newAdj] pastromi",
                "some [newAdj] donut holes",
                "some [newAdj] anchovies",
                "[AN] [newAdj] seasonal pie",
                "a box of [newAdj] chocolates",
                "[AN] [newAdj] avocado",
                "a bag of [newAdj] doritos"    ];
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

const drinks = [    "[AN] [newAdj] gallon of milk",
                    "[AN] [newAdj] bottle of water",
                    "a carton of [newAdj] chocolate milk",
                    "[AN] [newAdj] can of tomato juice",
                    "[AN] [newAdj] can of beer",
                    "[AN] [newAdj] capri-sun",
                    "[AN] [newAdj] carton of apple juice",
                    "[AN] [newAdj] 5-hour energy",
                    "[AN] [newAdj] Chug Jug",
                    "[AN] [newAdj] can of pepsi",
                    "[AN] [newAdj] can of coca cola",
                    "[AN] [newAdj] bottle of whiskey",
                    "[AN] [newAdj] keg of beer",
                    "[AN] [newAdj] pumpkin spice latte",
                    "[AN] [newAdj] bottle of Mike's Hard Lemonade",
                    "[AN] [newAdj] jug of maple syrup",
                    "[AN] [newAdj] can of Red Bull",
                    "[AN] [newAdj] can of Dr. Pepper",
                    "[AN] [newAdj] can of Mountain Dew",
                    "[AN] [newAdj] bottle of Fireball Whiskey"     ];
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

const clothing = [  "[AN] [newAdj] MAGA hat",
                    "some [newAdj] underwear",
                    "[AN] [newAdj] Abba t-shirt",
                    "[AN] [newAdj] thong",
                    "[AN] [newAdj] XXXL jock strap",
                    "[AN] [newAdj] pair of crocs",
                    "[AN] [newAdj] bunny girl outfit",
                    "[AN] [newAdj] dragon furry suit",
                    "[AN] [newAdj] pair of socks",
                    "[AN] [newAdj] fanny pack",
                    "[AN] [newAdj] cowboy hat",
                    "[AN] [newAdj] top hat",
                    "[AN] [newAdj] bow tie",
                    "[AN] [newAdj] helicopter hat",
                    "[AN] [newAdj] umbrella",
                    "[AN] [newAdj] lingerie",
                    "[AN] [newAdj] blanket",
                    "[AN] [newAdj] dog bed",
                    "[AN] [newAdj] mattress",
                    "[AN] [newAdj] pillow" ];
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

const electronics = [   "[AN] [newAdj] ipad",
                        "[AN] [newAdj] game controller",
                        "[AN] [newAdj] RTX 3080",
                        "[AN] [newAdj] Morbius blu-ray disc",
                        "[AN] [newAdj] keyboard",
                        "[AN] [newAdj] USB-C cable",
                        "[AN] [newAdj] texas instruments calculator",
                        "[AN] [newAdj] printer",
                        "[AN] [newAdj] Ratatouille blu-ray disc",
                        "[AN] [newAdj] iPhone 4",
                        "[AN] [newAdj] copy of Windows XP",
                        "[AN] [newAdj] NES",
                        "[AN] [newAdj] atari 2600",
                        "six [newAdj] PS5s",
                        "[AN] [newAdj] copy of ET: the video game",
                        "[AN] [newAdj] car",
                        "[AN] [newAdj] GPS tracker",
                        "[AN] [newAdj] USB microphone" ];
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

const toys = [  "six [newAdj] toy cars",
                "[AN] [newAdj] LED llama figure",
                "[AN] [newAdj] bubble blower",
                "[AN] [newAdj] tricyle",
                "[AN] [newAdj] yoyo",
                "[AN] [newAdj] Rubix cube",
                "[AN] [newAdj] model airplane",
                "[AN] [newAdj] remote-controlled car",
                "[AN] [newAdj] super soaker",
                "[AN] [newAdj] teddy bear",
                "a random assortment of [newAdj] legos",
                "[AN] [newAdj] baseball bat",
                "[AN] [newAdj] football",
                "[AN] [newAdj] bowling ball",
                "[AN] [newAdj] bowling pin",
                "1000 [newAdj] puzzle pieces",
                "10 [newAdj] puzzle pieces",
                "[AN] [newAdj] jump rope"  ];
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

const toiletries = [    "[AN] [newAdj] toilet paper roll",
                        "[AN] [newAdj] toothbrush",
                        "some [newAdj] toenail clippers",
                        "[AN] [newAdj] toilet",
                        "[AN] [newAdj] hairbrush",
                        "[AN] [newAdj] comb",
                        "[AN] [newAdj] hair dryer",
                        "[AN] [newAdj] toothpaste bottle",
                        "[AN] [newAdj] bidet",
                        "[AN] [newAdj] nail file",
                        "[AN] [newAdj] lint roller",
                        "[AN] [newAdj] stick of deoderant",
                        "some [newAdj] dental floss",
                        "[AN] [newAdj] straight razor",
                        "[AN] [newAdj] rectal thermometer",
                        "[AN] [newAdj] toilet brush",
                        "[AN] [newAdj] COVID test kit",
                        "[AN] [newAdj] ShamWow"    ];
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
const wtf = [   "[AN] [newAdj]sawed-off shotgun",
                "some [newAdj]uncut bank notes",
                "[AN] [newAdj]wad of $100 bills",
                "[AN] [newAdj]elephant tusk",
                "[AN] [newAdj]bomb",
                "[AN] [newAdj]gun",
                "[AN] [newAdj]bale of cannabis",
                "[AN] [newAdj]human hair",
                "[AN] [newAdj]24 carat diamond",
                "[AN] [newAdj]severed hand",
                "[AN] [newAdj]severed foot",
                "[AN] [newAdj]bar of gold",
                "[AN] [newAdj]Declaration of Independence",
                "[AN] [newAdj]Mona Lisa",
                "[AN] [newAdj]time machine",
                "[AN] [newAdj]copy of Half Life 3"    ];
const wtfAdj = [ "fake ", "real ", "[EMPTY]" ];

const tools = [     "[AN] [newAdj] bucket",
                    "[AN] [newAdj] jackhammer",
                    "[AN] [newAdj] hand drill",
                    "some [newAdj] nails",
                    "some [newAdj] scissors",
                    "[AN] [newAdj] picnic table",
                    "[AN] [newAdj] bottle opener",
                    "[AN] [newAdj] tool box",
                    "[AN] [newAdj] nail gun",
                    "[AN] [newAdj] stapler",
                    "[AN] [newAdj] sledge hammer",
                    "[AN] [newAdj] bottle of glue",
                    "some [newAdj] flex tape",
                    "[AN] [newAdj] microscope",
                    "[AN] [newAdj] lockpick",
                    "[AN] [newAdj] shopping cart"     ];
const toolsAdj = [ "broken", "advanced", "old", "worn", "factory-new", "dirty" ];

const kitchen = [   "[AN] [newAdj] tubberware container",
                    "[AN] [newAdj] pot",
                    "[AN] [newAdj] whole oven",
                    "[AN] [newAdj] kitchen sink",
                    "[AN] [newAdj] silverware set",
                    "[AN] [newAdj] blender",
                    "[AN] [newAdj] refridgerator",
                    "[AN] [newAdj] meat cleaver",
                    "[AN] [newAdj] convection oven",
                    "[AN] [newAdj] crock pot",
                    "[AN] [newAdj] spoon",
                    "[AN] [newAdj] pressure cooker",
                    "[AN] [newAdj] glass jar",
                    "[AN] [newAdj] porcelain plate",
                    "[AN] [newAdj] tea cup",
                    "[AN] [newAdj] tea pot",
                    "[AN] [newAdj] spork",
                    "[AN] [newAdj] deep freezer",
                    "[AN] [newAdj] deep fryer"   ];
const kitchenAdj = [ "broken", "new", "old", "dirty", "clean", "shiny", "stinky" ];

const collectibles = [  "[AN] [newAdj] star wars lego death star set",
                        "a binder of [newAdj] holoraphic pokemon cards",
                        "[AN] [newAdj] back to the future lunchbox",
                        "[AN] [newAdj] saved by the bell lunchbox",
                        "a bag of [newAdj] silver dimes",
                        "[AN] [newAdj] Darth Vader action figure",
                        "[AN] [newAdj] Blockbuster member card",
                        "[AN] [newAdj] book of stamps",
                        "an assortment of [newAdj] Zippo lighters",
                        "a box full of [newAdj] postcards",
                        "[AN] [newAdj] copy of Marval Comics #1",
                        "[AN] [newAdj] Babe Ruth Topps baseball card",
                        "[AN] [newAdj] Honus Wagner baseball card",
                        "some [newAdj] tickets to BlizCon",
                        "[AN] [newAdj] Batmobile replica",
                        "[AN] [newAdj] Delorean",
                        "[AN] [newAdj] chunk of meteorite"  ];
const collectiblesAdj = [ "mint-condition", "pristine", "unkept", "dirty", "fake", "real" ];

const animals = [   "[AN] [newAdj] rat",
                    "[AN] [newAdj] raccoon",
                    "[AN] [newAdj] opossum",
                    "[AN] [newAdj] five-legged rat",
                    "a family of [newAdj] spiders",
                    "[AN] [newAdj] pigeon",
                    "[AN] [newAdj] seagull",
                    "[AN] [newAdj] coyote",
                    "[AN] [newAdj] muskrat",
                    "[AN] [newAdj] vulture",
                    "two [newAdj] cockroaches",
                    "[AN] [newAdj] squirrel",
                    "a hoard of [newAdj] centipedes",
                    "[AN] [newAdj] trash panda",
                    "[AN] [newAdj] cat"    ];
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

const furniture = [     "[AN] [newAdj] couch",
                        "[AN] [newAdj] gaming chair",
                        "[AN] [newAdj] recliner",
                        "[AN] [newAdj] rocking chair",
                        "[AN] [newAdj] ottoman",
                        "[AN] [newAdj] coo-coo clock ",
                        "[AN] [newAdj] computer desk",
                        "[newAdj] accoustic wall panels",
                        "[AN] [newAdj] Ikea table",
                        "[AN] [newAdj] coffee table",
                        "[AN] [newAdj] entertainment center",
                        "[AN] [newAdj] bar stool",
                        "[AN] [newAdj] book shelf",
                        "[AN] [newAdj] futon",
                        "[AN] [newAdj] fold-up chair",
                        "[AN] [newAdj] cradle",
                        "[AN] [newAdj] throne",
                        "[AN] [newAdj] bath chair",
                        "some [newAdj] Shungite"   ];
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
                "Trauma's beard trimmer",
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
const miscAdj = "[EMPTY]";

// list of phrases that piebot can pick from when sending a message
const phrases = [   "[USER] goes rummaging through the garbage and finds [ITEM]. There have been [COUNT] pieces of trash found on [SERVER].",
                    "[USER] dug through Trash's special dumpster and found [ITEM]. They should probably pay for that... There have been [COUNT] pieces of trash found on [SERVER].",
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

        const guildCountVar = await Guild.findOne({
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

        const usersCountVar = await User.findOne({
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

        const globalCountVar = await GlobalCount.findOne({
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
        var userCount = usersCountVar.trashCount;
        userCount++;

        // taking the servers's item count from the database and adding one to it locally
        var guildCount = guildCountVar.trashCount;
        guildCount++;

        // taking the global item count from the database and adding one to it locally
        var globalCount = globalCountVar.trashCount;
        globalCount++;

        // initalizing as empty, probably not necessary
        var newItem = "";
        var newAdj = "";

        // generates a number from 1 to 13 to pick one of the 14 categories
        var randomCategory = Math.floor(Math.random() * 13) + 1;
        switch (randomCategory) {
            case (1):
                newItem = food[Math.floor(Math.random() * food.length)];
                newAdj = foodAdj[Math.floor(Math.random() * foodAdj.length)];
                break;
            case (2):
                newItem = drinks[Math.floor(Math.random() * drinks.length)];
                newAdj = drinksAdj[Math.floor(Math.random() * drinksAdj.length)];
                break;
            case (3):
                newItem = clothing[Math.floor(Math.random() * clothing.length)];
                newAdj = clothingAdj[Math.floor(Math.random() * clothingAdj.length)];
                break;
            case (4):
                newItem = electronics[Math.floor(Math.random() * electronics.length)];
                newAdj = electronicsAdj[Math.floor(Math.random() * electronicsAdj.length)];
                break;
            case (5):
                newItem = toys[Math.floor(Math.random() * toys.length)];
                newAdj = toysAdj[Math.floor(Math.random() * toysAdj.length)];
                break;
            case (6):
                newItem = toiletries[Math.floor(Math.random() * toiletries.length)];
                newAdj = toiletriesAdj[Math.floor(Math.random() * toiletriesAdj.length)];
                break;
            case (7):
                newItem = wtf[Math.floor(Math.random() * wtf.length)];
                newAdj = wtfAdj[Math.floor(Math.random() * wtfAdj.length)];
                break;
            case (8):
                newItem = tools[Math.floor(Math.random() * tools.length)];
                newAdj = toolsAdj[Math.floor(Math.random() * toolsAdj.length)];
                break;
            case (9):
                newItem = kitchen[Math.floor(Math.random() * kitchen.length)];
                newAdj = kitchenAdj[Math.floor(Math.random() * kitchenAdj.length)];
                break;
            case (10):
                newItem = collectibles[Math.floor(Math.random() * collectibles.length)];
                newAdj = collectiblesAdj[Math.floor(Math.random() * collectiblesAdj.length)];
                break;
            case (11):
                newItem = animals[Math.floor(Math.random() * animals.length)];
                newAdj = animalsAdj[Math.floor(Math.random() * animalsAdj.length)];
                break;
            case (12):
                newItem = furniture[Math.floor(Math.random() * furniture.length)];
                newAdj = furnitureAdj[Math.floor(Math.random() * furnitureAdj.length)];
                break;
            case (13):
                newItem = misc[Math.floor(Math.random() * misc.length)];
                // misc adjective is [EMPTY] and gets replaced with an empty string, this was done to prevent undefined errors
                newAdj = miscAdj;
                break;
            default:
                // using toys as the default because it has the most items, but it should never actually be called this way with the way the random generator works
                newItem = toys[Math.floor(Math.random() * toys.length)];
                newAdj = toysAdj[Math.floor(Math.random() * toysAdj.length)];
        }

        // Replaces phrase placeholder with chosen adjective
        newItem = newItem.replace('[newAdj]', newAdj);

        // If adjective is [EMPTY], gets replaced with an empty string... was originally done to prevent errors with undefined variables but might not even be needed anymore.
        if(newItem.includes("[EMPTY]")) {
            newItem = newItem.replace("[EMPTY]", "");
        }

        // Sets the phrase to either a random phrase or the special phrase if the trash gotten was the secret stash
        var phrase = ((newItem == "Trash's secret stash") ? specialPhrase : phrases[Math.floor(Math.random() * phrases.length)]);

        var vowels = ("aeiouAEIOU");
        // For certain items, picks "an" or "a" to have proper grammar with the adjective following
        if(newItem.includes("[AN]")) {
            // Checks the character two spaces after the closing brackets of [AN] to determine whether or not to use "a" or "an".
            if(vowels.indexOf(newItem[newItem.indexOf("]")+2]) !== -1) { 
                newItem = newItem.replace('[AN]', "an");
            } else {
                newItem = newItem.replace('[AN]', "a");
            }
        }

        // sets person response to either the user or the first argument, depending on the existance of the argument
        var commandPerson = (args.length > 0) ? args[0] : message.author;

        // Replaces all the placeholders in the phrase with the proper information
        phrase = phrase.replace('[USER]', commandPerson);
        phrase = phrase.replace('[ITEM]', newItem);
        phrase = phrase.replace('[COUNT]', guildCount);
        phrase = phrase.replace('[SERVER]', message.guild.name)

        message.channel.send(phrase).then(function (botSentMessage) {
            if(guildCount.toString().includes("69")) {
                botSentMessage.react("😏");
            }
        });

        // Updates the non-local guild count
        await guildCountVar.updateOne({
            trashCount: guildCount
        })

        // Updates the non-local global count
        await globalCountVar.updateOne({
            trashCount: globalCount
        })

        // Updates the non-local user count
        await usersCountVar.updateOne({
            trashCount: userCount
        })

    }
}
