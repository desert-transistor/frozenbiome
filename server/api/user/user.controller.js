var express = require('express');
var User = require('../../model/user/user.model').model;

var controller = {};

controller.index = function(req, res) {
  User.find(req.query, '-password -blogposts', function(err, users) {
    if(err) return res.send(500, err);
    res.status(200).json(users);
  });
};

controller.show = function(req, res) {
  var userId = req.params.id;

  User.findById(userId, '-password', function(err, user) {
    if (err) res.send(500);
    if (!user) res.send(404);
    res.json(user);
  });
}

controller.create = function(req, res) {
  var newUser = new User(req.body);

  newUser.save(function(err, user) {
    if (err) res.send(500);
    res.send(200);
  });
}

module.exports = controller;