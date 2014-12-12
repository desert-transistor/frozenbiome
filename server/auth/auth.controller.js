var express = require('express');
var User = require('../model/user/user.model').model;

exports.login = function(req, res){
  User.find(req.body, function(err, users){
    if(err) return res.send(500, err);
    if (users.length === 0) { return res.redirect('/signup');}
    res.status(200).send(users[0]._id);
  })
}