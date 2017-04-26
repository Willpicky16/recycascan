const express = require('express');
const router = express.Router();
const binModel = require('../models/bins');
const collectionModel = require('../models/collections');
const recyclingCentreModel = require('../models/recycling-centres');
const postcodeModel = require('../models/postcodes');

router.route('/').get(function (request, response) {
  response.status(200).send({ status: 'OK' });
});

router.route('/bins')
  .get(function (request, response) {
    binModel.find({}, function (error, bins) {
      if (error) {
        return response.status(500).send({ error: error });
      }
      response.status(200).send({ bins: bins });
    });
  });

router.route('/collections')
  .get(function (request, response) {
    collectionModel.find({}, function (error, collections) {
      if (error) {
        return response.status(500).send({ error: error });
      }
      response.status(200).send({ collections: collections });
    });
  });

router.route('/recyclingcentres')
  .get(function (request, response) {
    recyclingCentreModel.find({}, function (error, recyclingcentres) {
      if (error) {
        return response.status(500).send({ error: error });
      }
      response.status(200).send({ recyclingcentres: recyclingcentres });
    });
  });

router.route('/postcodes')
  .get(function (request, response) {
    postcodeModel.find({}, function (error, postcode) {
      if (error) {
        return response.status(500).send({ error: error });
      }
      response.status(200).send({ postcode: postcode });
    });
  });

module.exports = router;