var User = require('../models/User');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

module.exports = {
	login_Form: function (req, res, next) {
		console.log(req.session, "session...")
		res.render('loginForm');
	},

	login: function (req, res, next) {
		console.log(req.body);
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) return next(err);
			if (!user) {
				return res.status(400).redirect('/users/registerUser');
			}
			if (user) {
				const result = bcrypt.compareSync(req.body.password, user.password);
				if (!result) {
					return res.status(400).redirect('/users/loginForm');
				} else if (result) {
					console.log(result, "Login succesull");
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
		console.log(req.body, "body......................")
		// var user = req.body;
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) return next(err);
			if (user) {
				console.log("user exist...")
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
				res.status(400).redirect('/');

				//SAVING USER DATA IN OBJ
				fetch(`https://www.codewars.com/api/v1/users/${req.body.username}`).then(res => res.json())
					.then(data => {
						user.codewars = data;
						user.save();
					});


			})
		})
	},

	logout: function (req, res, next) {
		req.session.destroy();
		res.redirect('/users/loginForm');
	}
}
