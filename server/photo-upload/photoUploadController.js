var express = require('express');
var multiparty = require('multiparty');
var Promise = require('bluebird');
var Q = require('q');
var fs = Promise.promisifyAll(require('fs'));
var moment = require('moment');
var path = require('path');
var lodash = require('lodash');
var imageMagick = Promise.promisifyAll(require('imageMagick'));

var photoRouter = express.Router();

photoRouter.post('/', function(request, response){
  var form = new multiparty.Form();
  form.parse(request, function(err, fields, files){
    //write to file system
    var userId;
    var promptId;
    var filePath;
    var base64Data;
    if(typeof fields === 'object'){
      console.log(fields);
      userId = fields.user_id[0] || fields.user_id;
      promptId = fields.prompt_id[0] || fields.prompt_id;
      if(files.file){
        filePath = files.file[0].path || null;
      }
    }
  })
})
