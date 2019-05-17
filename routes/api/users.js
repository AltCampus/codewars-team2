var express = require('express');
var router = express.Router();
var apiController = require('../../controller/apiController');
// var authController = require('../../controller/authController');

router.get('/', apiController.All_Users);
router.get('/:name', apiController.get_User);

module.exports = router;
