//Requires
var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt');

//User model
var User = require('../models/users');

//GET route for users page
router.get('/users/:user', function(req, res){
	console.log(req.params.user);
	User.findById(req.params.user, function(err, user) {
      console.log(user)
    	res.send(user)
  	})
})

//Log In route
router.post('/login', function(req, res){
	User.findOne({userName:req.body.userName}, function(err, foundUser){
		if(foundUser && bcrypt.compareSync(req.body.password, foundUser.password)){
			req.session.userName = foundUser.userName;
			// console.log(req.session);
			console.log('successful sign in')
			res.send(foundUser);
		} else {
			console.log('failed: bad password')
			res.send('failed');
		}
	});
});

//Log Out route and session is destroyed
router.post('/logout', function(req, res) {
	req.session.destroy(function(err) {
		console.log('user session destroyed and logged out')
		res.redirect('/')
	})
});

//Sign Up route -> a push User.create
router.post('/', function(req, res){
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	// console.log(req.body);
	// console.log(req.session);
	console.log('Trying to update our records')
	User.create(req.body, function(err, user) {
		console.log('this is the user being added: '+user);
		if(user !== undefined){
			console.log('You\'re name has successfully been added')
			req.session.userName = user.userName;
			res.send(user);
		} else{
			console.log("I\'m afraid a mishap has occured!")
			res.send(user);
		}
		// console.log(req.session.userName);
	});
});

module.exports = router;
