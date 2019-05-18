var express = require('express');
var router = express.Router();
var authController = require('../controller/authController');
var bootStrapped = require('../controller/bootstrapped');


/* GET home page. */
router.get('/', authController.isUserLoggedIn, (req, res, next) => {
  res.render('index', { title: 'AltWars' });
});

// rendering dashboard
router.get('/dashboard', function (req, res, next) {
  res.render('dashboard');
});

router.get('/weekly', function (req, res, next) {
  res.render('weekly');
});

// router.get('/weekly/boot', bootStrapped.boot_weekly);



module.exports = router;
