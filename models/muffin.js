const mongoose = require('mongoose');

const muffinSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userName: String,
    muffinCount: Number
});

module.exports = mongoose.model('Muffin', muffinSchema, 'muffins');