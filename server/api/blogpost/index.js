var express = require('express');
var controller = require('./blogpost.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.index);

router.post('/:id', controller.update);
router.post('/', controller.create);

module.exports = router;