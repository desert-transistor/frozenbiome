// deps
var mongoose = require('mongoose');
var express = require('express');

var config = require('./config');
var router = require('./router');

// connect to db
console.log('mongo', config.mongo.url);
mongoose.connect(config.mongo.url, config.mongo.options);

// init app
var app = express();

// middlewares
config.express(app);

// router
router(app);

// expose app
module.exports = app;
