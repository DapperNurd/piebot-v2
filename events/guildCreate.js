const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async(client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        pieCount: 0,
        muffinCount: 0,
        potatoCount: 0,
        iceCreamCount: 0,
        pizzaCount: 0,
        fishCount: 0
    });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('I have joined a new server!');
};