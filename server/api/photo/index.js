var express = require('express');
var photoUploadController = require('./photo.Controller.js');

var router = express.Router();

router.post('/', photoUploadController.postPhoto);

module.exports = router;