var User = require('../models/User');

module.exports = {
	All_Users: function (req, res, next) {
		User.find({}, (err, users) => {
			if (err) return next(err);
			res.json(users);
		})
	},

	batch_User: function (req, res, next) {
		User.find({ batch: req.params.batch }, (err, users) => {
			if (err) return next(err);
			res.json(users);
		})
	},
}