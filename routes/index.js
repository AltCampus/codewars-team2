var express = require('express');
var router = express.Router();
var authController = require('../controller/authController');

/* GET home page. */
router.get('/', authController.isUserLoggedIn, (req, res, next) => {
  res.render('dashboard', { title: 'Express' });
});

// router.get('/dashboard', function (req, res, next) {
//   res.render('dashboard', { title: 'Express' });
// });


module.exports = router;
