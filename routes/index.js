var express = require('express');
var router = express.Router();
var authController = require('../controller/authController');

/* GET home page. */
router.get('/', authController.isUserLoggedIn, (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// rendering dashboard
router.get('/dashboard', function (req, res, next) {
  res.render('dashboard');
});


module.exports = router;
