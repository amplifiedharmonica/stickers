var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.pageTitle = 'Index Page'
  res.render('index', { pageTitle: 'Index Page' });
});

module.exports = router;
