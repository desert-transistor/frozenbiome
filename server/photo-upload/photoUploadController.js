var express = require('express');
var multiparty = require('multiparty');
var Promise = require('bluebird');
var Q = require('q');
var fs = Promise.promisifyAll(require('fs'));
var moment = require('moment');
var path = require('path');
var lodash = require('lodash');
var imageMagick = Promise.promisifyAll(require('imagemagick'));
var uuid = require('node-uuid');
// var photoRouter = express.Router();

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
            destination_path = '.archives/' + uuid.v4() + extension;
            var input_stream = fs.createReadStream(temportal_path);
            var output_stream = fs.createWriteStream(destination_path);
            input_stream.pipe(output_stream);
            input_stream.on('end', function(){
              fs.unlinkSync(temportal_path);
              console.log('Uploaded: ', file_name, size);
            });
          });

          form.on('close', function(){
            console.log('Uploaded!!');
          });

          form.parse(req);

        },


      // postPhoto: function(req, res){
      //   var form = new multiparty.Form();
      //   form.parse(req, function(err, fields, files) {
      //     Object.keys(fields).forEach(function(name) {
      //       console.log(fields);
      //       console.log('got field named ' + name);
      //     });

      //     Object.keys(files).forEach(function(name) {
      //       console.log(files.file);
      //       fs.writeFile(fields.prompt_id.toString(), files.file, function(err){
      //         if(err){ throw err; }
      //         console.log('it is saved!');
      //       })
      //       console.log('got file named ' + name);
      //     });

      //     console.log('Upload completed!');
      //     // res.setHeader('text/plain');
      //     res.end('Received ' + files.length + ' files');
      //   });

      // },

      // fs.chmodAsync(filePath, '0777')
      // fs.renameAsync(filePath, newPath);
      // fs.writeFileAsync(newPath, base64Data, 'base64');
        




    // postPhoto: function(req, res){
    //   console.log('!!!!!! POSTPHOTO !!!!!!');
    //   console.log('REQ', req);
    //   var count = 0;
    //   var form = new multiparty.Form();
      
      
    //   form.on('error', function(err){
    //     console.log('Error parsing form: ' + err.stack);
    //   });
      
    //   form.on('part', function(part){
        
    //     if(part.filename === null){
    //       console.log('got field named ' + part.name);
    //       part.resume();
    //     }
        
    //     if(part.filename !== null){
    //       console.log('got field named ' + part.name);
    //       part.resume();
    //     }

    //     part.on('error', function(err){
    //       console.log('ERROR');
    //     })

    //   })

    //   form.on('close', function(){
    //     console.log('Upload completed!');
    //     // res.setHeader('text/plain');
    //     res.end('Received ' + count + ' files');
    //   });

    //   form.parse(req);

    // },

    /////////////  OTHER OPTION /////////////////

  // postPhoto: function(req, res){
  //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',req.files);
  //   var form = new multiparty.Form();                 //from multiparty
  //   form.parse(req, function(err, fields, files){     //from multiparty
  //     //write to file system
  //     var userId;                     //!!!!!!!!!!!!!!!!!!!!! Not sure i'm using userId
  //     var promptId;                   //!!!!!!!!!!!!!!!!!!!!! Not sure i'm using promptId
  //     var filePath;           
  //     var base64Data;
  //     if(typeof fields === 'object'){
  //       userId = fields.user_id[0] || fields.user_id;           //!!!!!!!!!!!!!!!!!!!!! Not sure i'm using user_id
  //       promptId = fields.prompt_id[0] || fields.prompt_id;     //!!!!!!!!!!!!!!!!!!!!! Not sure i'm using promptId
  //       if(files.file){
  //         filePath = files.file[0].path || null;
  //       }else if(files.image){
  //         filePath = files.image[0].path || null;
  //       }else if(fields.image_data){
  //         base64Data = fields.image_data[0].replace(/^data:image\/png;base64,/, "");
  //       }else{
  //         res.status(404).end();
  //       }
  //     }else{
  //       userId = req.body.user_id;
  //       promptId = req.body.prompt_id;
  //       filePath = req.body['image[path]'] || null;
  //       imageString = req.body.image_string || null;
  //     }
  //     var name = '' + userId + '-' + promptId + '-' + moment().format('x');
  //     var newImageFileName, newPath, new200Path, new500Path, fileExtenstion;
  //     Q().then(function(){
  //       if (filePath !== null && filePath !== undefined){
  //         filePath = path.resolve(filePath);
  //         fileExtenstion = _.last(filePath.split('.'));
  //         newImageFileName = name + '.' + fileExtenstion;
  //         newPath = path.join(__dirname, '/../arhives/original/', newImageFileName);
  //         new200Path = path.join(__dirname, '/../arhives/square-200px/', newImageFileName);
  //         new500Path = path.join(__dirname, '/../arhives/square-500px/', newImageFileName);
  //         return  fs.chmodAsync(filePath, '0777')
  //           .then(function(){
  //             return fs.renameAsync(filePath, newPath);
  //           });
  //       }
  //       if(base64){
  //         fileExtenstion = 'png';
  //         newImageFileName = name + '.' + fileExtenstion;
  //         newPath = path.join(__dirname, '/../arhives/original/', newImageFileName);
  //         new200Path = path.join(__dirname, '/../arhives/square-200px/', newImageFileName);
  //         new500Path = path.join(__dirname, '/../arhives/square-500px/', newImageFileName);
  //         return fs.writeFileAsync(newPath, base64Data, 'base64');
  //       }
  //       throw new Error('Nothing to do');
  //     })
  //     .then(function(){
  //       return imageMagick.cropAsync({
  //         srcPath: newPath,
  //         dstPath: new500Path,
  //         width: 500,
  //         height: 500
  //       })
  //     }).then(function(){
  //       return new models.Photo({
  //         user_id: userId,
  //         prompt_id: promptId,
  //         filename: newImageFileName
  //       })
  //       .save();
  //     }).then(function(photo){
  //       res.json(photo.toJSON());
  //     }).catch(function(err){
  //       console.log('ERROR: ', err);
  //       res.status(400).end();
  //     });
  //   });
  // },

  getPhotos: function(req, res){
    models.Photo
      .fetchAll()
      .then(function(collection){
        res.json(collection.toJSON()).end();
      })
  }
}

// module.exports = photoRouter;
