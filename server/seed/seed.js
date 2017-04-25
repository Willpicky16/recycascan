const mongoose = require('mongoose');
const BinDoc = require('../models/bins');
const binData = require('./data/bins.js');

mongoose.connect('mongodb://localhost/recycascan', function (error) {
    if (error) {
        console.log(error);
        return process.exit();
    }
    console.log(binData);
    binData.forEach(function (bin, i) {
        let binDoc = new BinDoc(bin);
        binDoc.save(function (error, doc) {
            if (error) {
                return console.log(error);
            }
            console.log(`Council ${i} ${bin.council} saved to db!`);
        });
    });
});