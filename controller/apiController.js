var User = require('../../models/User');

module.exports = {
	All_Users: function (req, res, next) {
		User.find({}, (err, Users) => {
			if (err) return next(err);
			console.log(users);
			res.json(Users);
		})
	},

	get_User: function (req, res, next) {
		User.findOne({ _id: req.params.id }, (err, Users) => {
			if (err) return next(err);
			res.json(Users);
		})
	},
}