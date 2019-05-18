var User = require('../models/User');

exports.isUserLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
  	User.findById(req.session.userId, (err, user) => {
  		if(err) return next(err);
  		req.user = user;
  		res.locals.user = user;
    	return next();
  	})
  }else {
    res.redirect("/users/login");
  }
}

exports.sessions = (req, res, next) => {
	if (req.session && req.session.userId) {
  	User.findOne({_id: req.session.userId}, (err, user) => {
  		if(err) return next(err);
  		req.user = user;
  		res.locals.user = user;
      return next();
  	})
  }else {
  	req.user = null;
  	res.locals.user = null;
  	next();
  }
}
