const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    council: String,
    day: Number,
    month: String,
    year: Number,
    bins: Array
});

module.exports = mongoose.model('collections', collectionSchema);