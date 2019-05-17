var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  var {email, password} = req.body
  if (!email || !password) {
      return res.render('loginForm')
  }
  User.findOne({email: email}, (err, user) => {
      if (err) return next(err)
      if (!user) return res.status(400).render('loginForm')
      if (!user.validatePassword(password)) return res.status(400).render('loginForm')
      req.session.userId = user._id;
      res.status(200).json('getUsers')
  })
})

module.exports = router;
