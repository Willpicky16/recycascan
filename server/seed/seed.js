const mongoose = require('mongoose');
const BinDoc = require('../models/bins');
const binData = require('./data/bins.js');
const CollectionDoc = require('../models/collections');
const collectionData = require('./data/collections.js');
const async = require('async');
const log4js = require('log4js');
const logger = log4js.getLogger();


// mongoose.connect('mongodb://localhost/recycascan', function (error) {
//     if (error) {
//         console.log(error);
//         return process.exit();
//     }
//     console.log(binData);
//     binData.forEach(function (bin, i) {
//         let binDoc = new BinDoc(bin);
//         binDoc.save(function (error, doc) {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log(`Council ${i} ${bin.council} saved to db!`);
//         });
//     });
// });

mongoose.connect('mongodb://localhost/recycascan', function (err) {
  if (!err) {
    // logger.info(`connected to database ${DBs.dev}`);
    mongoose.connection.db.dropDatabase();
    async.waterfall([
      addBins,
      addCollections
    ], function (err) {
      if (err) {
        logger.error('ERROR SEEDING :O');
        console.log(JSON.stringify(err));
        process.exit();
      }
      logger.info('DONE SEEDING!!');
      process.exit();
    });
  } else {
    logger.error('DB ERROR');
    console.log(JSON.stringify(err));
    process.exit();
  }
});

function addBins(done) {
  logger.info('adding bins')
  async.eachSeries(binData, function (bin, cb) {
    let binDoc = new BinDoc(bin);
    binDoc.save(function (err) {
      if (err) {
        return cb(err);
      }
      return cb();
    });
  }, function (error) {
    if (error) return done(error);
    return done(null)
  })
}

function addCollections(done) {
  logger.info('adding collections')
  async.eachSeries(collectionData, function (collection, cb) {
    let collectionDoc = new CollectionDoc(collection);
    collectionDoc.save(function (err) {
      if (err) {
        return cb(err);
      }
      return cb();
    });
  }, function (error) {
    if (error) return done(error);
    return done(null)
  })
}