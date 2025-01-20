const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    name: String,
    rate: Number
},{timestamps: true});

module.exports = mongoose.model('Currency', currencySchema);