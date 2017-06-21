var express 	= require('express');
var app 		= express();
var router 		= express.Router();
var Twitter = require('twitter');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('twitter');
});



module.exports = router;
