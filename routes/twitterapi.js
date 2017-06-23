require('dotenv').config();

var Twitter 	= require('twitter');
var express 	= require('express');
var app 		= express();
var router 		= express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('twitterapi');
});
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_TOKENSECRET
});
 
var params = {screen_name: 'stephenrdawes'};
var one_way_followers = [];
var users_to_display = [];

client.get('followers/ids', params, function(error, followers_results, response) {
  if (error) 
    throw error;

  

  var followers = followers_results.ids;

  client.get('friends/ids', params, function(error, following_results, response) {
	if (error) 
		throw error;

	var following = following_results.ids;

	following.forEach(function(person) {
		// If someone you follow doesnt follow you, add to array.
		if (followers.indexOf(person) === -1) {
			one_way_followers.push(person);
		}
	});

	// only take the first 100 users
	one_way_following = one_way_followers.slice(0, 99);

	// turn array into a string
	var one_way_following_string = one_way_following.join();

	client.get('users/lookup', {user_id: one_way_following_string}, function(error, users_results, response) {

		users_results.forEach(function(user) {
			var userObject = {
				name: user.name,
				screen_name: user.screen_name,
				avatar: user.profile_image_url
			};

			users_to_display.push(userObject);
		});
		console.log(users_to_display);
	});

	
	
  });

});







module.exports = router;
