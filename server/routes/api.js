const express = require('express');
const router = express.Router();
const binModel = require('../models/bins');

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

module.exports = router;