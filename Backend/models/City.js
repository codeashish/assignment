const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({});

module.exports = mongoose.model('cities', citySchema);
