const express = require ('express');
const app = express();
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recycascan');

app.use(function (request, response, next) {
    console.log('Received request!');
    next();
});

app.use('/api', apiRouter);

app.use('/*', function (request, response) {
    response.status(404).send({reason: '404 -ROUTE NOT FOUND'});
});

app.listen(3000, function (error) {
    if (error) {
        return console.log(error);
    }
    console.log('App listening on port 3000');
});