var express = require('express');
var User = require('../../model/user/user.model').model;
var Blogpost = require('../../model/blogpost/blogpost.model').model;

var controller = {};

controller.index = function(req, res) {
  var userId = req.query.userId;
  if (!userId) return res.send(400, 'send userId=userId in query params');
  User.findById(userId, function(err, user) {
    if (err) return res.send(500, 'error in finding userId: ' + userId);
    res.json({
      blogpostCount: user.blogposts.length,
      blogposts: user.blogposts
    })
  })
}

controller.write = function(req, res) {
  console.log('yo')
  req.params.id ? this.update(req, res) : this.create(req, res);
}

controller.create = function(req, res) {
  var userId = req.query.userId;
  if (!userId) return res.send(400, 'send userId=userId in query params');
  User.findById(userId, function(err, user) {
    if (err) return res.send(500, 'error in finding userId: ' + userId);
    res.status(200).send();
  });
};



module.exports = controller;