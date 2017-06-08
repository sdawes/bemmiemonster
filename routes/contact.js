// require('dotenv').config(); 

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
	res.render('contact');
});

router.post('/send', function(req, res, next){

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
	    host: 'smtp-mail.outlook.com',
	    port: 587,
	    secure: false, // secure:true for port 465, secure:false for port 587
	    tls: {
	    	ciphers: 'SSLv3'
	    },
	    auth: {
	        user: 'sdawes@outlook.com',
	        pass: process.env.PASS_OUTLOOK
	    }
	});

	// setup email data with unicode symbols
	var mailOptions = {
	    from: '"Fred Foo 👻" <sdawes@outlook.com>', // sender address
	    to: 'sdawes@outlook.com', // list of receivers
	    subject: '😍 New message from your website!', // Subject line
	    text: '😍 You have a new message from your website with the following details: Name: ' +req.body.first_name + 'Surname: ' + req.body.last_name + 'Email: ' + req.body.email + 'Phone Number: ' + req.body.number + 'Message: ' + req.body.message, // plain text body
	    html: '<b>😍 You have a new message from your website with the following details: </b><br><ul><li>First Name: ' + req.body.first_name + '</li><li>Surname: ' + req.body.last_name + '</li><li>Email: ' + req.body.email + '</li><li>Phone Number: ' + req.body.number + '</li><li>Message: ' + req.body.message + '</li></ul>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info) {
	    if (error) {
	        console.log(error);
	        res.redirect('/');
	    } else {
	    	console.log('Message sent: ' + info.response);
	    	res.redirect('/');
	    	
	    }
	    
	});
});



module.exports = router;