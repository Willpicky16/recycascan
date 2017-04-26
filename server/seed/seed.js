const mongoose = require('mongoose');
const BinDoc = require('../models/bins');
const binData = require('./data/bins.js');
const CollectionDoc = require('../models/collections');
const collectionData = require('./data/collections.js');
const RecyclingCentreDoc = require('../models/recycling-centres');
const recyclingCentreData = require('./data/recycling-centres.js');
const postcodeData = require('./data/postcodes.js');
const PostcodeDoc = require('../models/postcodes');
const async = require('async');
const log4js = require('log4js');
const logger = log4js.getLogger();

mongoose.connect('mongodb://localhost/recycascan', function (err) {
  if (!err) {
    // logger.info(`connected to database ${DBs.dev}`);
    mongoose.connection.db.dropDatabase();
    async.waterfall([
      addBins,
      addCollections,
      addRecyclingCentres,
      addPostcodes
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

function addRecyclingCentres(done) {
  logger.info('adding recycling centres')
  async.eachSeries(recyclingCentreData, function (centre, cb) {
    let recyclingCentreDoc = new RecyclingCentreDoc(centre);
    recyclingCentreDoc.save(function (err) {
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

function addPostcodes(done) {
  logger.info('adding postcodes')
  async.eachSeries(postcodeData, function (code, cb) {
    let postcodeDoc = new PostcodeDoc(code);
    postcodeDoc.save(function (err) {
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