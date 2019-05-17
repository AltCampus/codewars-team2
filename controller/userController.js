var User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
	login_Form: function(req, res, next) {
		var err = req.flash('err');
    console.log(err, 'flash check in login form............');
	},

	login: function(req, res, next) {
		User.findOne({email: req.body.email}, (err, user) => {
			if(err)	return res.status(500).redrect('/users/login');
			if(!user) {
				req.flash('err', 'Invalid email...')
				return res.status(400).redirect('/users/register');
			}
			if(user){
				const result = bcrypt.compareSync(req.body.password, user.password)
				if(!result){
      		req.flash('err', 'Incorrect password');
					return res.status(400).redirect('/users/login');
				}else if(result){
					console.log(result, "Login succesull");
					req.session.userId = user._id;
      		req.flash('login', "login successfull");
					return res.status(200).redirect('/');
				};
			}
		})
	},

	register_Form: function(req, res, next) {
		res.render('signUp');
	},

	register: function(req, res, next) {
		// var user = req.body;
		// User.create(user, (err, user) => {
		// 	if(err) {
		// 		next(err)
		// 		console.log(err, "error while registering");
		// 		// return res.status(400).redirect('/users/register');
		// 	};
		// 	Cart.create({userId: user._id}, (err, cart) =>{
		// 		if(err) return next(err);
		// 		User.findByIdAndUpdate({_id: user._id}, {$push: {cartId: cart._id}}, {new: true}, (err, user) => {
		// 			console.log("registerd sucessfully.....................")
		// 			req.session.userId = user._id;
		// 			res.redirect('/');
		// 		})
		// 	})	
		// })
	},

	logout: function(req, res, next) {
		req.session.destroy();
		res.redirect('/users/login');
	}
}