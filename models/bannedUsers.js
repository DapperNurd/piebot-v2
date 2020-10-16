const mongoose = require('mongoose');

const bannedUserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userTag: String
});

module.exports = mongoose.model('BannedUser', bannedUserSchema, 'bannedUsers');