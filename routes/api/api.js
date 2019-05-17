var express = require('express');
var router = express.Router();

var userApi = require('./user');

router.use('/users', userApi);

module.exports = router;