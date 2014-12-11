// deps
var mongoose = require('mongoose');
var express = require('express');

var config = require('./config');
var router = require('./router');

// connect to db
mongoose.connect(config.mongo.url, config.mongo.options);

// init app
var app = express();

// mids
config.express(app);

// router
router(app);

// expose app
module.exports = app;
