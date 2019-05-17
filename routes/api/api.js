var express = require('express');
var router = express.Router();

var userApi = require('./users');

router.use('/users', userApi);

module.exports = router;