const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
    name: 'manualadd',
    description: "this is a manualadd command!",
    run: async (commandSent, message, args, client) => {
        if(args.length < 1) {
            return message.channel.send("Please type a user after the command. \nExample: **!manualadd @Nurd**").then(m=> m.delete({timeout:10000}));
        } else {
            if (args[0].startsWith('<@') && args[0].endsWith('>')) {
                var id = args[0].slice(2, -1);
        
                if (id.startsWith('!')) {
                    id = id.slice(1);
                }
        
                var statUser = client.users.cache.get(id);
            } else {
                var statUser = client.users.cache.get(args[0]);
            }
            const userUniqueCounts = await User.findOne({
                userID: statUser
            }, (err, user) => {
                if(err) console.error(err);
                if(!user) {
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        userID: statUser.id,
                        userName: statUser.tag,
                        pieCount: 0,
                        muffinCount: 0,
                        potatoCount: 0,
                        iceCreamCount: 0,
                        pizzaCount: 0,
                        cakeCount: 0,
                        cookieCount: 0,
                        pastaCount: 0,
                        sandwichCount: 0
                    });
    
                    newUser.save()
                    .then(result => console.log(result))
                    .catch(err => console.err(err));
    
                    return message.channel.send(`Manually added ${statUser.username}`).then(m=> m.delete({timeout:10000}));
                } else {
                    return message.channel.send(`${statUser.username} is already in the database!`).then(m=> m.delete({timeout:10000}));
                }
            });
        }
    }
}