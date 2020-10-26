
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var session = require('express-session');
var index = require('./routes/index');
var status = require('./routes/status');

mongoose.connect('mongodb://localhost/Facebook', { useNewUrlParser: true,useUnifiedTopology: true  }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
  
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(flash());
app.use('/', index);
app.use('/status', status);

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
