var express = require('express');
var authController = require('./auth.controller');

var router = express.Router();

//login
router.post('/login', authController.login);
// router.get();

// router.post();  

//signup


module.exports = router;