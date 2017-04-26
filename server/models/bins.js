const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const binSchema = new Schema({
    council: String,
    packaging: String,
    bin: String
});

module.exports = mongoose.model('bins', binSchema);