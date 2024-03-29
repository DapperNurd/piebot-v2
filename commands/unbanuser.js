const mongoose = require('mongoose');
const BannedUser = require('../models/bannedUsers')

module.exports = {
    name: 'unbanuser',
    description: "this is the UNBAN command!",
    run: async (commandSent, message, args, client) => {
        if(args.length == 0) {
            return message.channel.send("**Error:** Please add an ID after the command.\nExample: **!unbanuser 12345678910**");
        }
        var banUser = client.users.cache.get(args[0]);
        if (args[0].startsWith('<@') && args[0].endsWith('>')) {
            var id = args[0].slice(2, -1);
    
            if (id.startsWith('!')) {
                id = id.slice(1);
            }
    
            banUser = client.users.cache.get(id);
        }
        BannedUser.findOneAndDelete({
            userID: banUser.id
        }, (err, res) => {
            if(err) console.error(err);
            if(res) {
                message.channel.send(`Unbanned user \`${banUser.tag }\``);
            } else {
                message.channel.send(`${banUser.tag } is not currently banned!`);
            }
        });
    }
}