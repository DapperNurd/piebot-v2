const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userName: String,
    pizzaCount: Number
});

module.exports = mongoose.model('Pizza', pizzaSchema, 'pizzas');