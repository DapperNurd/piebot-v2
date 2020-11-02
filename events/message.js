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

    const args = message.content.split(/ +/);
    var tempCmd = args.shift().toLowerCase();

    if(tempCmd.startsWith("!") || tempCmd.startsWith(".")) {
        const cmd = tempCmd.substring(1);
        if(bannedUsersVar != null && message.author.id == bannedUsersVar.userID) {
            message.channel.send(`${message.author}, You are banned from using commands!`).then(m=> m.delete({timeout:10000}))
        } else if(cmd === 'ping') {
            client.commands.get('ping').run(message, args, client);
        }
        else if(cmd === 'pie' || cmd === 'pierate') {
            client.commands.get('pie').run(message, args, client);
        }
        else if(cmd === 'muffin') {
            client.commands.get('muffin').run(message, args, client);
        }
        else if(cmd === 'potato' || cmd === 'tater') {
            client.commands.get('potato').run(message, args, client);
        }
        else if(cmd === 'icecream' || cmd === 'ice' || cmd === 'cream') {
            client.commands.get('icecream').run(message, args, client);
        }
        else if(cmd === 'pizza') {
            client.commands.get('pizza').run(message, args, client);
        }
        else if(cmd === 'fish') {
            client.commands.get('fish').run(message, args, client);
        }
        else if(cmd === 'menu') {
            client.commands.get('menu').run(message, args, client);
        }
        else if(cmd === 'ask') {
            client.commands.get('ask').run(message, args, client);
        }
        else if(cmd === 'help' || cmd === 'commands') {
            client.commands.get('help').run(message, args, client);
        }
        else if(cmd === 'scale' || cmd === 'commands') {
            client.commands.get('scale').run(message, args, client);
        }
        else if(cmd === 'coinflip' || cmd === 'coin' || cmd === 'cf') {
            client.commands.get('coinflip').run(message, args, client);
        }
        else if(cmd === 'stats' || cmd === 'info') {
            client.commands.get('stats').run(message, args, client);
        }
        else if(cmd === 'global' || cmd === 'globalstats' || cmd === 'allstats') {
            client.commands.get('global').run(message, args, client);
        }
        else if(cmd === 'server' || cmd === 'guild') {
            client.commands.get('server').run(message, args, client);
        }
        else if(cmd === 'pi' || cmd === 'π') {
            client.commands.get('pi').run(message, args, client);
        }
        else if(cmd === 'wowee' || cmd === 'wow') {
            client.commands.get('wowee').run(message, args, client);
        }
        else if(cmd === 'say' || cmd === 'tts') {
            client.commands.get('say').run(message, args, client);
        }
        else if(cmd === 'banuser' || cmd === 'userban' || cmd === 'getbanned') {
            if(message.author.id == "189510396569190401") {
                client.commands.get('banuser').run(message, args, client);
            } else {
                message.channel.send("🤔").then(m=> m.delete({timeout:60000}))
            }
        }
        else if(cmd === 'manualadd' || cmd === 'add' || cmd === 'getunbanned') {
            if(message.author.id == "189510396569190401") {
                client.commands.get('manualadd').run(message, args, client);
            } else {
                message.channel.send("🤔").then(m=> m.delete({timeout:60000}))
            }
        }
        else if(cmd === 'unbanuser' || cmd === 'unuserban' || cmd === 'userunban') {
            if(message.author.id == "189510396569190401") {
                client.commands.get('unbanuser').run(message, args, client);
            } else {
                message.channel.send("🤔").then(m=> m.delete({timeout:60000}))
            }
        }
        else if(cmd === 'join' || cmd === 'connect') {
            if(message.author.id == "189510396569190401") {
                client.commands.get('join').run(message, args, client);
            } else {
                message.channel.send("🤔").then(m=> m.delete({timeout:60000}))
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