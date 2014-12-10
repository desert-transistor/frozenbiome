var express = require('express');
var multiparty = require('multiparty');
var Promise = require('bluebird');
var Q = require('q');
var fs = Promise.promisifyAll(require('fs'));
var moment = require('moment');
var path = require('path');
var lodash = require('lodash');
var imageMagick = Promise.promisifyAll(require('imagemagick'));
var photoRouter = express.Router();

photoRouter.post('/', function(req, res){
  console.log(req.files);
  var form = new multiparty.Form();                 //from multiparty
  form.parse(req, function(err, fields, files){     //from multiparty
    //write to file system
    var userId;                     //!!!!!!!!!!!!!!!!!!!!! Not sure i'm using userId
    var promptId;                   //!!!!!!!!!!!!!!!!!!!!! Not sure i'm using promptId
    var filePath;           
    var base64Data;
    if(typeof fields === 'object'){
      userId = fields.user_id[0] || fields.user_id;           //!!!!!!!!!!!!!!!!!!!!! Not sure i'm using user_id
      promptId = fields.prompt_id[0] || fields.prompt_id;     //!!!!!!!!!!!!!!!!!!!!! Not sure i'm using promptId
      if(files.file){
        filePath = files.file[0].path || null;
      }else if(files.image){
        filePath = files.image[0].path || null;
      }else if(fields.image_data){
        base64Data = fields.image_data[0].replace(/^data:image\/png;base64,/, "");
      }else{
        res.status(404).end();
      }
    }else{
      userId = req.body.user_id;
      promptId = req.body.prompt_id;
      filePath = req.body['image[path]'] || null;
      imageString = req.body.image_string || null;
    }
    var name = '' + userId + '-' + promptId + '-' + moment().format('x');
    var newImageFileName, newPath, new200Path, new500Path, fileExtenstion;
    Q().then(function(){
      if (filePath !== null && filePath !== undefined){
        filePath = path.resolve(filePath);
        fileExtenstion = _.last(filePath.split('.'));
        newImageFileName = name + '.' + fileExtenstion;
        newPath = path.join(__dirname, '/../arhives/original/', newImageFileName);
        new200Path = path.join(__dirname, '/../arhives/square-200px/', newImageFileName);
        new500Path = path.join(__dirname, '/../arhives/square-500px/', newImageFileName);
        return  fs.chmodAsync(filePath, '0777')
          .then(function(){
            return fs.renameAsync(filePath, newPath);
          });
      }
      if(base64){
        fileExtenstion = 'png';
        newImageFileName = name + '.' + fileExtenstion;
        newPath = path.join(__dirname, '/../arhives/original/', newImageFileName);
        new200Path = path.join(__dirname, '/../arhives/square-200px/', newImageFileName);
        new500Path = path.join(__dirname, '/../arhives/square-500px/', newImageFileName);
        return fs.writeFileAsync(newPath, base64Data, 'base64');
      }
      throw new Error('Nothing to do');
    })
    .then(function(){
      return imageMagick.cropAsync({
        srcPath: newPath,
        dstPath: new500Path,
        width: 500,
        height: 500
      })
    }).then(function(){
      return new models.Photo({
        user_id: userId,
        prompt_id: promptId,
        filename: newImageFileName
      })
      .save();
    }).then(function(photo){
      res.json(photo.toJSON());
    }).catch(function(err){
      console.log('ERROR: ', err);
      res.status(400).end();
    });
  });
});

photoRouter.get('/', function(req, res){
  models.Photo
    .fetchAll()
    .then(function(collection){
      res.json(collection.toJSON()).end();
    })
})

module.exports = photoRouter;
