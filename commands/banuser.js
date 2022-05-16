const mongoose = require('mongoose');
const BannedUser = require('../models/bannedUsers')

module.exports = {
    name: 'banuser',
    description: "this is the BAN command!",
    run: async (message, args, client, index) => {
        if(args.length == 0) {
            return message.channel.send("**Error:** Please add an ID after the command. \nExample: **!banuser 12345678910**");
        }
        var banUser = client.users.cache.get(args[0]);
        if (args[index+1].startsWith('<@') && args[index+1].endsWith('>')) {
            var id = args[0].slice(2, -1);
    
            if (id.startsWith('!')) {
                id = id.slice(1);
            }
    
            banUser = client.users.cache.get(id);
        }
        const bannedUsersVar = await BannedUser.findOne({
            userID: banUser.id
        }, (err, guild) => {
            if(!guild) { // if user is not already banned
                const newBan = new BannedUser({
                    _id: mongoose.Types.ObjectId(),
                    userID: banUser.id,
                    userTag: banUser.tag
                });

                newBan.save()
                .then(result => console.log(result))
                .catch(err => console.err(err));

                return message.channel.send(`Banned user \`${banUser.tag }\``);
            } else { // if user is already banned
                //console.log();
                return message.channel.send(`${banUser.tag } is already banned!`);
            }
        });
    }
}