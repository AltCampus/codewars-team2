var User = require('../models/User');

module.exports = {
	All_Users: function (req, res, next) {
		User.find({}, { password: 0, prevWeek: 0 }, (err, users) => {
			if (err) return next(err);
			res.json(users);
		})
	},

	Weekly_User: function (req, res, next) {
		User.find({}, { password: 0, codewars: 0 }, (err, users) => {
			if (err) return next(err);
			res.json(users);
		})
	},
}