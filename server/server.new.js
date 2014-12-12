// deps
var mongoose = require('mongoose');
var express = require('express');

var config = require('./config');
var router = require('./router');

// connect to db
mongoose.connect(config.mongo.url, config.mongo.options);

// init app
var app = express();

// middlewares
config.express(app);

// router
router(app);

var port = 8000;
app.listen(port);
console.log("Listening on localhost: " + port)

// expose app
module.exports = app;
