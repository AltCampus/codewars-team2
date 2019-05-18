var express = require('express');
var router = express.Router();
var apiController = require('../controller/apiController');
// var authController = require('../../controller/authController');

router.get('/users', apiController.All_Users);
router.get('/weekly', apiController.Weekly_User);



module.exports = router;
