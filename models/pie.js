const mongoose = require('mongoose');

const pieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userName: String,
    pieCount: Number
});

module.exports = mongoose.model('Pie', pieSchema, 'pies');