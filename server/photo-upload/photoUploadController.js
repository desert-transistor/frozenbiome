var express = require('express');
var multiparty = require('multiparty');
var Promise = require('bluebird');
var Q = require('q');
var fs = Promise.promisifyAll(require('fs'));
var moment = require('moment');
var path = require('path');
var lodash = require('lodash');
var uuid = require('node-uuid');



module.exports = {

  postPhoto: function(req, res){
    var size = '';
    var file_name = '';
    var destination_path = '';
    var form = new multiparty.Form();

    form.on('error', function(err){
      console.log('Error parsing form: ' + err.stack);
    });

    form.on('part', function(part){
      if(!part.filename){
        return;
      }
      size = part.byteCount;
      file_name = part.filename;
    });

    form.on('file', function(name, file){
      var temportal_path = file.path;
      var extension = file.path.substring(file.path.lastIndexOf('.'));
      var imageName = uuid.v4() + extension;
      destination_path = path.join(__dirname, '/archives/', imageName);
      var input_stream = fs.createReadStream(temportal_path);
      var output_stream = fs.createWriteStream(destination_path);
      input_stream.pipe(output_stream);
      input_stream.on('end', function(){
        fs.unlinkSync(temportal_path);
        console.log('Uploaded: ', file_name, size);
        res.send('archives/' + imageName);
      });
    });

    form.on('close', function(){
      console.log('Uploaded!!');
    });

    form.parse(req);

  },
      
  getPhotos: function(req, res){
    models.Photo
      .fetchAll()
      .then(function(collection){
        res.json(collection.toJSON()).end();
      })
  }
}

// module.exports = photoRouter;
// var photoRouter = express.Router();
