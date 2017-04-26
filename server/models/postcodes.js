const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postcodeSchema = new Schema({
    postcode: String,
    council: String,
});

module.exports = mongoose.model('postcodes', postcodeSchema);