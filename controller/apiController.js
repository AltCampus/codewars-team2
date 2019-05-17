var User = require('../models/User');

module.exports = {
	All_Users: function (req, res, next) {
		User.find({}, (err, users) => {
			if (err) return next(err);
			res.json(users);
		})
	},

	get_User: function (req, res, next) {

		console.log(req.body);
		console.log(req.params);
		User.findOne({ username: req.params.name }, (err, users) => {
			if (err) return next(err);
			res.json(users);
		})
	},
}