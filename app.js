var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var theatersRouter = require('./routes/theatersRouter');
var topIndianRouter = require('./routes/topIndianRouter');
var topMovies = require('./routes/topMovies');
var topTv = require('./routes/topTv');
var comments = require('./routes/commentsRouter');
var favorites = require('./routes/favoritesRouter');

const Theaters = require('./models/theatersModel');
const TopIndian = require('./models/topIndianModel');
const TopMovies = require('./models/topMoviesModel');
const TopTv = require('./models/topTvModel');
const User = require('./models/user');

const url = config.mongoUrl;
const connect = mongoose.connect(url,{useNewUrlParser:true,useFindAndModify:false});

connect.then((db) => {

  console.log('Successfully Connected to Server');

}).catch((err) => console.log(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/theaters',theatersRouter);
app.use('/topIndian',topIndianRouter);
app.use('/topmovies',topMovies);
app.use('/toptv',topTv);
app.use('/comments',comments);
app.use('/favorites',favorites);

app.use(cors({origin: 'http://localhost:3001'}));

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
