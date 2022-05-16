const mongoose = require('mongoose');
const BannedUser = require('../models/bannedUsers')

module.exports = {
    name: 'sendmsg',
    description: "this is the send message command!",
    run: async (commandSent, message, args, client) => {
        if(args.length < 2) {
            return message.channel.send("**Incorrect Format:** Please use the following format: `!sendmsg (channelID) (message)`");
        }

        var sendText = args.slice(1).join(" ");
        
        message.channel.send(`Sent following text: \`\`\`${sendText}\`\`\` to channel: \`\`\`${client.channels.cache.get(args[0]).name}\`\`\``);
        client.channels.cache.get(args[0]).send(sendText);
    }
}