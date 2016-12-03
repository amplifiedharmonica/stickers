var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var cardController = require('./controllers/card');
var fs = require('fs-extra');
var busboy = require('connect-busboy');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/media', express.static(path.join(__dirname, 'media')));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// Connect to the cards MongoDB
mongoose.connect('mongodb://localhost:27017/cards');

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /cards
router.route('/cards')
    .post(cardController.postCards)
    .get(cardController.getCards);

// Create endpoint handlers for /cards/:card_id
router.route('/cards/:card_id')
    .get(cardController.getCard)
    .put(cardController.putCard)
    .delete(cardController.deleteCard);

/* GET New card page. */
router.get('/newcard', function(req, res) {
  res.render('newcard', {pageTitle: 'Add New Card' });

});

// Register all our routes with /api
app.use('/api', router);

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log('Running on http://localhost:3000');
module.exports = app;
