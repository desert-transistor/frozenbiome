var express = require('express');
var User = require('../../model/user/user.model').model;
var Blogpost = require('../../model/blogpost/blogpost.model').model;
var Q = require('q');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var controller = {};

controller.index = function (req, res) {
  var userId = req.query.userId;
  if (!userId) return res.send(400, 'send userId=userId in query params');
  User.findById(userId, function (err, user) {
    if (err) return res.send(500, 'error in finding userId: ' + userId);
    return res.json({
      // blogpostCount: user.blogposts.length,
      blogposts: user.blogposts
    })
  })
}

controller.create = function (req, res) {
  console.log(req.body);
  var userId = req.query.userId;
  if (!userId) return res.status(400).send('send userId=userId in query params');
  User.findById(userId, function (err, user) {
    if (err) return res.status(500).send('error in finding userId: ' + userId);
    var newBlogpost = new Blogpost(req.body);
    user.blogposts.push(newBlogpost);
    user.save();

    return res.status(200).send({
      newBlogpostId: newBlogpost._id
    });
  });
};

controller.update = function (req, res) {
  var userId = req.query.userId;
  if (!userId) return res.status(400).send('send userId=userId in query params');
  User.findById(userId, function (err, user) {
    if (err) return res.status(500).send('error in finding userId: ' + userId);

    user.blogposts.id(req.params.id)
      .content = req.body.content;

    user.save();

    res.status(200).send('OK');
  });

}

controller.delete = function (req, res) {
  var username = req.body.username;
  var userId = req.body.userID;
  var postID = req.body.postID;
  var imageUrlArray = req.body.imageUrl;
  console.log('imageUrlArray: ', imageUrlArray);

  return new Q()
    .then(function () {
      User.findById(userId, function (err, user) {
        if (err) return res.send(500, 'error in finding userId: ' + userId);
        console.log('user.blogposts.length: ', user.blogposts.id(postID));
        user.blogposts.id(postID).remove();
        user.save();
      });
    })
    .then(function () {
      var removeSingleFile = function (array, fileIndex) {
        console.log('__dirname: ', __dirname);
        var destinationPath = path.resolve(__dirname, '../photo/archives', array[fileIndex]);
        fs.unlink(destinationPath, function (err) {
          if (err) {
            console.log('Error deleting file: ', err);
          }
        });
        if (array[fileIndex + 1]) {
          removeSingleFile(array, fileIndex + 1);
        }
      };
      removeSingleFile(imageUrlArray, 0);
    });

};

module.exports = controller;