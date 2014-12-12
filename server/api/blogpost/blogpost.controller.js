var express = require('express');
var User = require('../../model/user/user.model').model;
var Blogpost = require('../../model/blogpost/blogpost.model').model;

var controller = {};

controller.index = function(req, res) {
  var userId = req.query.userId;
  if (!userId) return res.send(400, 'send userId=userId in query params');
  User.findById(userId, function(err, user) {
    if (err) return res.send(500, 'error in finding userId: ' + userId);
    return res.json({
      blogpostCount: user.blogposts.length,
      blogposts: user.blogposts
    })
  })
}

controller.create = function(req, res) {
  console.log(req.body);
  var userId = req.query.userId;
  if (!userId) return res.status(400).send('send userId=userId in query params');
  User.findById(userId, function(err, user) {
    if (err) return res.status(500).send('error in finding userId: ' + userId);

    var newBlogpost = new Blogpost(req.body);
    user.blogposts.push(newBlogpost);
    user.save();

    return res.status(200).send({newBlogpostId: newBlogpost._id});
  });
};

controller.update = function(req, res) {
  var userId = req.query.userId;
  if (!userId) return res.status(400).send('send userId=userId in query params');
  User.findById(userId, function(err, user) {
    if (err) return res.status(500).send('error in finding userId: ' + userId);
    
    user.blogposts.id(req.params.id)
      .content = req.body.content;

    user.save();

    res.status(200).send('OK');
  });

}

controller.delete = function(req, res){
  var userId = req.query.userId;
  if (!userId) return res.status(400).send('send userId=userId in query params');
  User.findById(userId, function(err, user) {
    if (err) return res.status(500).send('error in finding userId: ' + userId);

    user.blogposts.id(req.params.id).remove();
    user.save();
    res.status(200).send('Deleted');
  });
}



module.exports = controller;