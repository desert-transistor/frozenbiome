var express = require('express');
var controller = require('./blogpost.controller');

var router = express.Router();

router.get('/', controller.index);      //get all for one user
router.get('/:id', controller.index);   //get post equal to id

router.post('/:id', controller.update); //edit
router.post('/', controller.create);    //new post

router.delete('/:id', controller.delete);  //delete a post

module.exports = router;