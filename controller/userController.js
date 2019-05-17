var User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
	login_Form: function(req, res, next) {
    res.render('loginForm');
	},

	login: function(req, res, next) {
		User.findOne({email: req.body.email}, (err, user) => {
			if(err)	return res.status(500).redrect('/users/loginForm');
			if(!user) {
				return res.status(400).redirect('/users/registerUser');
			}
			if(user){
				const result = bcrypt.compareSync(req.body.password, user.password)
				if(!result){
					return res.status(400).redirect('/users/loginForm');
				}else if(result){
					console.log(result, "Login succesull");
					req.session.userId = user._id;
      		console.log('login', "login successfull");
					return res.status(200).redirect('/');
				};
			}
		})
	},

	register_Form: function(req, res, next) {
		res.render('registerUser');
	},

	register: function(req, res, next) {
		var user = req.body;
		User.findOne({email: user.email}, (err, user) => {
			if(err) return next(err);
			if(user) {
				console.log("user exist...")
			}
			User.create(user, (err, user) => {
				if(err) return next(err);
				console.log("registration sucessfull.......");
				res.status(400).redirect('/');
			})
		})
	},

	logout: function(req, res, next) {
		req.session.destroy();
		res.redirect('/users/loginForm');
	}
}