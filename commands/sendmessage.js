const mongoose = require('mongoose');
const BannedUser = require('../models/bannedUsers')

module.exports = {
    name: 'sendmsg',
    description: "this is the send message command!",
    run: async (message, args, client) => {
        if(args.length < 2) {
            return message.channel.send("**Incorrect Format:** Please use the following format: `/sendmsg (channelID) (message)`");
        }

        var sendText = "test";
        var newString = args;
        message.channel.send(`Sent ${newString} to channel: " + ${bot.channels.get(sendChannel).name}`);

        client.channels.get(args[0]).send(args);
    }
}