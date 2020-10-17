const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userName: String,
    pieCount: Number,
    muffinCount: Number,
    potatoCount: Number,
    iceCreamCount: Number,
    pizzaCount: Number,
    fishCount: Number
});

module.exports = mongoose.model('User', userSchema, 'users');