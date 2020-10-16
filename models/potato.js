const mongoose = require('mongoose');

const potatoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userName: String,
    potatoCount: Number
});

module.exports = mongoose.model('Potato', potatoSchema, 'potatos');