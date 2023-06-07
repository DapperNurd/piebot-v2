const mongoose = require('mongoose');

const globalCountSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    globalID: String,
    pieCount: Number,
    muffinCount: Number,
    potatoCount: Number,
    iceCreamCount: Number,
    pizzaCount: Number,
    fishCount: Number,
    cakeCount: Number,
    cookieCount: Number,
    pastaCount: Number,
    sandwichCount: Number,
    trashCount: Number,
    brownieCount: Number
});

module.exports = mongoose.model('GlobalCount', globalCountSchema, 'globalCounts');