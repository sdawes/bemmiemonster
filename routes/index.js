var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { siteName: 'Podeg'} );
});

module.exports = router;
