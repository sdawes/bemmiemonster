var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/codewars_db', function() {
	console.log('Connected to mongodb');
});

var db = mongoose.connection;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('codewars');
});

module.exports = router;