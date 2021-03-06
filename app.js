require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var authController = require('./controller/authController');

var connectDb = async () => {
  try {
  var connection = await mongoose.connect(
    // 'mongodb://altwar:qwerty123@ds255329.mlab.com:55329/altwars'
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(connection, 'connection...');
    connection ? console.log('mongodb is connected...') : console.log('mongodb not connected...')
  }catch(err){
    console.log(err, console.log('mlab mongodb connection err...'));
  }
}


connectDb()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'ninjas everywhere',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(authController.sessions);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
