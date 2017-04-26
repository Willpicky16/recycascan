const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recyclingCentreSchema = new Schema({
    name: String,
    address: String,
    postcode: String
});

module.exports = mongoose.model('recycling-centres', recyclingCentreSchema);