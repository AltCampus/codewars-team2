var express = require('express');
var router = express.Router();
var apiController = require('../controller/apiController');
// var authController = require('../../controller/authController');

router.get('/users', apiController.All_Users);
router.get('/users/:batch', apiController.batch_User);

module.exports = router;
