const mongoose = require('mongoose');
const BannedUser = require('../models/bannedUsers')

module.exports = {
    name: 'sendmsg',
    description: "this is the send message command!",
    run: async (message, args, client) => {
        if(args.length < 2) {
            return message.channel.send("**Incorrect Format:** Please use the following format: `/sendmsg (channelID) (message)`");
        }

        //for (i = 2; i < message.content.split(" ").length; i++) {
        //    newString += " " + message.content.split(" ")[i];
        //}

        var sendText = args.shift().join(" ");
        message.channel.send(`Sent \`\`\`${sendText}\`\`\` to channel: **${client.channels.cache.get(args[0]).name}**`);

        client.channels.cache.get(args[0]).send(sendText);
    }
}