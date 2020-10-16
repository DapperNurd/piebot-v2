const mongoose = require('mongoose');

const iceCreamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userName: String,
    iceCreamCount: Number
});

module.exports = mongoose.model('IceCream', iceCreamSchema, 'iceCreams');