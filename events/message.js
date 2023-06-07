const mongoose = require('mongoose');
const Guild = require('../models/guild');
const BannedUser = require('../models/bannedUsers')

module.exports = async (client, message) => {
    if(message.author.bot) return;
    
    const bannedUsersVar = await BannedUser.findOne({
        userID: message.author.id
    }, (err, guild) => {
        if(guild) {
            return;
        }
    });

    var args = message.content.split(/ +/);
    //var tempCmd = args.shift().toLowerCase(); old code
    var tempCmd = "null";
    var index = -1;

    // loops through array of arguments in message and looks for one starting with a command prefix ( ! . - )
    var letterCount = 0;
    for(let i = 0; i < args.length; i++) {
        if(args[i].startsWith("!") || args[i].startsWith(".") || args[i].startsWith("-")) {
            tempCmd = args[i].toLowerCase();
            index = letterCount;
            break;
        }
        letterCount += args[i].length+1;
    }

    // updates args to only include stuff after the command argument
    var msgAfterCmd = message.content.substring(index);
    var argsAfterCmd = msgAfterCmd.split(/ +/);

    argsAfterCmd.shift();

    args = argsAfterCmd;

    /**
     * @brief function that checks for banned users and also access the command's appropriate file
     * @param {*} command command file to access
     * @param {*} bypassBan boolean whether command is usuable by banned users
     */
    function runCommand(command, bypassBan) {
        if(bypassBan) {
            client.commands.get(command).run(tempCmd, message, args, client);
        } else {
            if(bannedUsersVar != null && message.author.id == bannedUsersVar.userID) { // CHECKS IF THE PERSON IS BANNED
                message.channel.send(`${message.author}, you are banned from using commands!`)
            } else {
                client.commands.get(command).run(tempCmd, message, args, client);
            }
        }
    }

    // if a command argument is found within the message
    if(tempCmd != "null") {
        //console.log(tempCmd);
        const cmd = tempCmd.substring(1);
        //console.log(cmd);
        if(cmd === 'ping') {
            //client.commands.get('ping').run(message, args, client);
            runCommand('ping', false);
        }
        else if(cmd === 'pie' || cmd === 'pierate') {
            //client.commands.get('pie').run(message, args, client);
            runCommand('pie', false);
        }
        else if(cmd === 'muffin' || cmd === 'muffins' || cmd === 'cupcake') {
            //client.commands.get('muffin').run(message, args, client);
            runCommand('muffin', false);
        }
        else if(cmd === 'potato' || cmd === 'tater' || cmd === 'potatoes' || cmd === 'potatos') {
            //client.commands.get('potato').run(message, args, client);
            runCommand('potato', false);
        }
        else if(cmd === 'icecream' || cmd === 'ice' || cmd === 'cream') {
            //client.commands.get('icecream').run(message, args, client);
            runCommand('icecream', false);
        }
        else if(cmd === 'pasta' || cmd === 'pastas' || cmd === 'noodle' || cmd === 'noodles') {
            //client.commands.get('icecream').run(message, args, client);
            runCommand('pasta', false);
        }
        else if(cmd === 'cookie' || cmd === 'cookies') {
            //client.commands.get('icecream').run(message, args, client);
            runCommand('cookie', false);
        }
        else if(cmd === 'sandwich' || cmd === 'sandwiches' || cmd === 'sammich' || cmd === 'sammiches' || cmd === 'sammy' || cmd === 'sammies') {
            //client.commands.get('icecream').run(message, args, client);
            runCommand('sandwich', false);
        }
        else if(cmd === 'cake' || cmd === 'cakes') {
            //client.commands.get('icecream').run(message, args, client);
            runCommand('cake', false);
        }
        else if(cmd === 'pizza' || cmd === "pizzas") {
            //client.commands.get('pizza').run(message, args, client);
            runCommand('pizza', false);
        }
        else if(cmd == "fish" || cmd == "fishes" || cmd == "fishs") {
            //client.commands.get('fish').run(message, args, client);
            runCommand('fish', false);
        }
        else if(cmd == "brownie" || cmd == "brownies" || cmd == "browney" || cmd == "brownee" || cmd == "brownees") {
            //client.commands.get('fish').run(message, args, client);
            runCommand('brownie', false);
        }
        else if(cmd === 'trash') {
            //client.commands.get('ask').run(message, args, client);
            runCommand('trash', false);
        }
        else if(cmd === 'menu') {
            //client.commands.get('menu').run(message, args, client);
            runCommand('menu', false);
        }
        else if(cmd === 'ask') {
            //client.commands.get('ask').run(message, args, client);
            runCommand('ask', false);
        }
        else if(cmd === 'tiddies' || cmd === 'animetiddies' || cmd === 'animetits' || cmd === 'animetitties' || cmd === 'titties' || cmd === 'tits' || cmd === 'tiddie' || cmd === 'tit' || cmd === 'titty' || cmd === 'tiddy' || cmd === 'tittie') {
            //client.commands.get('ask').run(message, args, client);
            runCommand('tiddies', false);
        }
        else if(cmd === 'gif' || cmd === 'search' || cmd === 'find' || cmd === 'getme' || cmd === 'gifs' || cmd === 'findme') {
            //client.commands.get('ask').run(message, args, client);
            runCommand('gifs', false);
        }
        else if(cmd === 'help' || cmd === 'commands') {
            //client.commands.get('help').run(message, args, client);
            runCommand('help', false);
        }
        else if(cmd === 'scale' || cmd === 'commands') {
            //client.commands.get('scale').run(message, args, client);
            runCommand('scale', false);
        }
        else if(cmd === 'odds' || cmd === 'odd' || cmd === 'whataretheodds' || cmd === 'chance' || cmd === 'chances' || cmd === 'whatisthechance' || cmd === 'odss') {
            //client.commands.get('odds').run(message, args, client);
            runCommand('odds', false);
        }
        else if(cmd === 'coinflip' || cmd === 'coin' || cmd === 'cf') {
            //client.commands.get('coinflip').run(message, args, client);
            runCommand('coinflip', false);
        }
        else if(cmd === 'roll' || cmd === 'dice' || cmd === 'diceroll') {
            //client.commands.get('coinflip').run(message, args, client);
            runCommand('roll', false);
        }
        else if(cmd === 'stats' || cmd === 'info') {
            //client.commands.get('stats').run(message, args, client);
            runCommand('stats', false);
        }
        else if(cmd === 'global' || cmd === 'globalstats' || cmd === 'allstats') {
            //client.commands.get('global').run(message, args, client);
            runCommand('global', false);
        }
        else if(cmd === 'server' || cmd === 'guild') {
            //client.commands.get('server').run(message, args, client);
            runCommand('server', false);
        }
        else if(cmd === 'pi' || cmd === 'π') {
            //client.commands.get('pi').run(message, args, client);
            runCommand('pi', false);
        }
        else if(cmd === 'wowee' || cmd === 'wowtf') {
            //client.commands.get('wowee').run(message, args, client);
            runCommand('wowee', false);
        }
        else if(cmd === 'thonk' || cmd === 'think') {
            //client.commands.get('wowee').run(message, args, client);
            runCommand('thonk', false);
        }
        else if(cmd === 'say' || cmd === 'tts') {
            //client.commands.get('say').run(message, args, client);
            runCommand('say', false);
        }

        // ADMIN COMMANDS

        else if(cmd === 'sendmsg' || cmd === 'sendmessage' || cmd === 'messagesend' || cmd === 'msgsend') {
            if(message.author.id == "189510396569190401") {
                //client.commands.get('sendmsg').run(message, args, client);
                runCommand('sendmsg', false);
            } else {
                message.channel.send("🤔")
            }
        }
        else if(cmd === 'banuser' || cmd === 'userban' || cmd === 'getbanned') {
            if(message.author.id == "189510396569190401") {
                //client.commands.get('banuser').run(message, args, client);
                runCommand('banuser', false);
            } else {
                message.channel.send("🤔")
            }
        }
        else if(cmd === 'manualadd' || cmd === 'add') {
            if(message.author.id == "189510396569190401") {
                //client.commands.get('manualadd').run(message, args, client);
                runCommand('manualadd', false);
            } else {
                message.channel.send("🤔")
            }
        }
        else if(cmd === 'unbanuser' || cmd === 'unuserban' || cmd === 'userunban' || cmd === 'getunbanned') {
            if(message.author.id == "189510396569190401") {
                //client.commands.get('unbanuser').run(message, args, client);
                runCommand('unbanuser', false);
            } else {
                message.channel.send("🤔")
            }
        }

    } else { // NON PREFIX COMMANDS... I.E. "ok"
        cmd = message.content.toLowerCase();;
        if(cmd === 'ok') {
            runCommand('ok', true);
        }
        if(cmd.includes('wowee')) {
            runCommand('woweetext', true);
        }
        if(cmd.includes('hmm') || cmd === "thonk") {
            runCommand('thonktext', true);
        }
    }
};