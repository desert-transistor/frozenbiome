var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);    //get all users
router.get('/:id', controller.show);  //get user profile for user equal to id

router.post('/', controller.create);  //signup

module.exports = router;