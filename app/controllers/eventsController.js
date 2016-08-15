//Requires
var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt');

//User model
var User = require('../models/users');


// add event
router.post('/new', function(req,res){
	// console.log(req.session.userName);
	if(req.session.userName !== undefined){
		User.findOne({userName : req.session.userName}, function(err, foundUser){
			//console.log(req.body);
			// console.log(foundUser);
			foundUser.events.push(req.body)
			foundUser.save(function(err){
				console.log('I have added the event');
			});
			res.send(foundUser.events);
		})
	}
});

router.delete('/:id', function(req, res) {
  // console.log(req.session.userName)
	User.findOne({ userName : req.session.userName }, function(err, user) {
    // console.log(user)
		user.events.splice(req.params.id, 1)
    user.save(function(err){
      console.log('removed event');
    });
    console.log(user);
    res.send(user.events);
	});
});

module.exports = router;
