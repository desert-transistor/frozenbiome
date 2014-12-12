var express = require('express');
var bodyParser = require('body-parser');
var morgan  = require('morgan');
var session = require('express-session');
var marked = require('marked');

var mongo = {
  url: "mongodb://localhost/waffledb",
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

function appMiddleware (app) {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(session({
    secret: 'zfnzkwjehgweghw',
    resave: false,
    saveUninitialized: true
  }));
app.use(express.static(__dirname + './api/photo/archives'));
  app.use(express.static(__dirname + '/../client'));
}

exports.mongo = mongo;
exports.express = appMiddleware;