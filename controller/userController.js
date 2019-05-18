var User = require('../models/User');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

module.exports = {
	login_Form: function (req, res, next) {
		res.render('loginForm');
	},

	login: function (req, res, next) {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) return next(err);
			if (!user) {
				return res.status(400).redirect('/users/register');
			}
			if (user) {

				var result = user.validatePassword(req.body.password);				
				if (!result) {
					return res.status(400).redirect('/users/login');
				} else if (result) {
					console.log(result, "Login succesull...");
					req.session.userId = user._id;
					return res.status(200).redirect('/');
				};
			}
		})
	},

	register_Form: function (req, res, next) {
		res.render('registerUser');
	},

	register: function (req, res, next) {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) return next(err);
			if (user) {
				return res.json({ message: "User already exists" });
			}
			User.create({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				batch: req.body.batch
			}, (err, user) => {
				if (err) return next(err);
				console.log("registration sucessfull.......");
				req.session.userId = user._id;

				//SAVING USER DATA IN OBJ
				fetch(`https://www.codewars.com/api/v1/users/${req.body.username}`).then(res => res.json()).then(data => {
					
					user.codewars = data;
					user.save((err,user)=>{
						fetch(`https://api.github.com/users/${user.username}`).then(res => res.json()).then(data => {
							user.profilePicURL = data.avatar_url;
							user.save();
							res.status(400).redirect('/');
						});
					});
				});

			})
		})
	},

	logout: function (req, res, next) {
		req.session.destroy();
		res.redirect('/users/login');
	}
}
