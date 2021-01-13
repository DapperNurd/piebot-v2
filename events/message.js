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

    function runCommand(command, bypassBan) {
        if(bypassBan) {
            client.commands.get(command).run(message, args, client);
        } else {
            if(bannedUsersVar != null && message.author.id == bannedUsersVar.userID) { // CHECKS IF THE PERSON IS BANNED
                message.channel.send(`${message.author}, you are banned from using commands!`)
            } else {
                client.commands.get(command).run(message, args, client);
            }
        }
    }

    const args = message.content.split(/ +/);
    var tempCmd = args.shift().toLowerCase();

    if(tempCmd.startsWith("!") || tempCmd.startsWith(".")|| tempCmd.startsWith("-")) {
        const cmd = tempCmd.substring(1);
        if(cmd === 'ping') {
            //client.commands.get('ping').run(message, args, client);
            runCommand('ping', false);
        }
        else if(cmd === 'pie' || cmd === 'pierate') {
            //client.commands.get('pie').run(message, args, client);
            runCommand('pie', false);
        }
        else if(cmd === 'muffin') {
            //client.commands.get('muffin').run(message, args, client);
            runCommand('muffin', false);
        }
        else if(cmd === 'potato' || cmd === 'tater') {
            //client.commands.get('potato').run(message, args, client);
            runCommand('potato', false);
        }
        else if(cmd === 'icecream' || cmd === 'ice' || cmd === 'cream') {
            //client.commands.get('icecream').run(message, args, client);
            runCommand('icecream', false);
        }
        else if(cmd === 'pizza') {
            //client.commands.get('pizza').run(message, args, client);
            runCommand('pizza', false);
        }
        else if(cmd === 'fish') {
            //client.commands.get('fish').run(message, args, client);
            runCommand('fish', false);
        }
        else if(cmd === 'menu') {
            //client.commands.get('menu').run(message, args, client);
            runCommand('menu', false);
        }
        else if(cmd === 'ask') {
            //client.commands.get('ask').run(message, args, client);
            runCommand('ask', false);
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
    } else { // NON PREFIX COMMANDS... I.E. "ok"
        cmd = args.toLowerCase();;
        if(cmd === 'ok') {
            runCommand('ok', true);
        }
        if(cmd.includes('wowee')) {
            runCommand('woweetext', false);
        }
        if(cmd.includes('hmm') || cmd === "thonk") {
            runCommand('thonktext', false);
        }
    }
};