var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var marked = require('marked');

var uriUtil = require('mongodb-uri');
var mongooseUri = process.env.MONGOLAB_URI;

if (mongooseUri) { //If we have an env variable in prod, use that

  // Format the URI
  // mongooseUri = uriUtil.formatMongoose(mongooseUri);
} else {
  mongooseUri = 'mongodb://localhost/waffledb'; //Otherwise, connect to your local instance. Choose name here.
}

var mongo = {
  url: mongooseUri,
  options: {
    server: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    }
  }
};

function appMiddleware(app) {
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
  }));
 app.use(morgan('dev'));
  app.use(session({
    secret: 'zfnzkwjehgweghw',
    resave: false,
    saveUninitialized: true
  }));
  console.log(__dirname);
  app.use(express.static(__dirname + '/api/photo/archives/'));
  app.use(express.static(__dirname + '/../client'));
}

exports.mongo = mongo;
exports.express = appMiddleware;
