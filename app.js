var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
//express session
const session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUnitiaized: true,
  cookie: {}
}))

var indexRoute = require('./routes/index');
var itemRoute = require('./routes/item');
var transactionRoute = require('./routes/transaction');
var historyRoute = require('./routes/history');
var reportRoute = require('./routes/report')

app.use('/', indexRoute);
app.use('/item', itemRoute);
app.use('/transaction', transactionRoute);
app.use('/report', reportRoute)
app.use('/history', historyRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
