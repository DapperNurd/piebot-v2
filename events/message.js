const mongoose = require('mongoose');
const Guild = require('../models/guild');
const BannedUser = require('../models/bannedUsers')

function runCommand(command) {
    if(bannedUsersVar != null && message.author.id == bannedUsersVar.userID) { // CHECKS IF THE PERSON IS BANNED
        message.channel.send(`${message.author}, you are banned from using commands!`)
    } else {
        client.commands.get(command).run(message, args, client);
    }
}

module.exports = async (client, message) => {
    if(message.author.bot) return;
    
    const bannedUsersVar = await BannedUser.findOne({
        userID: message.author.id
    }, (err, guild) => {
        if(guild) {
            return;
        }
    });

    const args = message.content.split(/ +/);
    var tempCmd = args.shift().toLowerCase();

    if(tempCmd.startsWith("!") || tempCmd.startsWith(".")|| tempCmd.startsWith("-")) {
        const cmd = tempCmd.substring(1);
        if(cmd === 'ping') {
            //client.commands.get('ping').run(message, args, client);
            runCommand('ping');
        }
        else if(cmd === 'pie' || cmd === 'pierate') {
            //client.commands.get('pie').run(message, args, client);
            runCommand('pie');
        }
        else if(cmd === 'muffin') {
            //client.commands.get('muffin').run(message, args, client);
            runCommand('muffin');
        }
        else if(cmd === 'potato' || cmd === 'tater') {
            //client.commands.get('potato').run(message, args, client);
            runCommand('potato');
        }
        else if(cmd === 'icecream' || cmd === 'ice' || cmd === 'cream') {
            //client.commands.get('icecream').run(message, args, client);
            runCommand('icecream');
        }
        else if(cmd === 'pizza') {
            //client.commands.get('pizza').run(message, args, client);
            runCommand('pizza');
        }
        else if(cmd === 'fish') {
            //client.commands.get('fish').run(message, args, client);
            runCommand('fish');
        }
        else if(cmd === 'menu') {
            //client.commands.get('menu').run(message, args, client);
            runCommand('menu');
        }
        else if(cmd === 'ask') {
            //client.commands.get('ask').run(message, args, client);
            runCommand('ask');
        }
        else if(cmd === 'help' || cmd === 'commands') {
            //client.commands.get('help').run(message, args, client);
            runCommand('help');
        }
        else if(cmd === 'scale' || cmd === 'commands') {
            //client.commands.get('scale').run(message, args, client);
            runCommand('scale');
        }
        else if(cmd === 'odds' || cmd === 'odd' || cmd === 'whataretheodds' || cmd === 'chance' || cmd === 'chances' || cmd === 'whatisthechance' || cmd === 'odss') {
            //client.commands.get('odds').run(message, args, client);
            runCommand('odds');
        }
        else if(cmd === 'coinflip' || cmd === 'coin' || cmd === 'cf') {
            //client.commands.get('coinflip').run(message, args, client);
            runCommand('coinflip');
        }
        else if(cmd === 'stats' || cmd === 'info') {
            //client.commands.get('stats').run(message, args, client);
            runCommand('stats');
        }
        else if(cmd === 'global' || cmd === 'globalstats' || cmd === 'allstats') {
            //client.commands.get('global').run(message, args, client);
            runCommand('global');
        }
        else if(cmd === 'server' || cmd === 'guild') {
            //client.commands.get('server').run(message, args, client);
            runCommand('server');
        }
        else if(cmd === 'pi' || cmd === 'π') {
            //client.commands.get('pi').run(message, args, client);
            runCommand('pi');
        }
        else if(cmd === 'wowee' || cmd === 'wowtf') {
            //client.commands.get('wowee').run(message, args, client);
            runCommand('wowee');
        }
        else if(cmd === 'say' || cmd === 'tts') {
            //client.commands.get('say').run(message, args, client);
            runCommand('say');
        }

        // ADMIN COMMANDS

        else if(cmd === 'banuser' || cmd === 'userban' || cmd === 'getbanned') {
            if(message.author.id == "189510396569190401") {
                client.commands.get('banuser').run(message, args, client);
            } else {
                message.channel.send("🤔")
            }
        }
        else if(cmd === 'manualadd' || cmd === 'add') {
            if(message.author.id == "189510396569190401") {
                client.commands.get('manualadd').run(message, args, client);
            } else {
                message.channel.send("🤔")
            }
        }
        else if(cmd === 'unbanuser' || cmd === 'unuserban' || cmd === 'userunban' || cmd === 'getunbanned') {
            if(message.author.id == "189510396569190401") {
                client.commands.get('unbanuser').run(message, args, client);
            } else {
                message.channel.send("🤔")
            }
        }
    } else {
        cmd = tempCmd;
        if(cmd === 'ok' && args.length == 0) {
            if(bannedUsersVar != null && message.author.id == bannedUsersVar.userID) {
                
            } else {
                client.commands.get('ok').run(message, args, client);
            }
        }
    }
};