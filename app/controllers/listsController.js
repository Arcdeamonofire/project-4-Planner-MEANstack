//Requires
var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt');

//User model
var User = require('../models/users');

router.post('/new', function(req,res){
	// console.log(req.session.userName);
	if(req.session.userName !== undefined){
		User.findOne({userName : req.session.userName}, function(err, foundUser){
			//console.log(req.body);
			// console.log(foundUser);
			foundUser.lists.push(req.body)
			foundUser.save(function(err){
				console.log('I have added the event');
			});
			res.send(foundUser.lists);
		});
	};
});

router.post('/newItem', function(req,res){
  // console.log(req.body)
  user = req.body[1];
  // console.log('user: '+user);
  list = req.body[2];
  // console.log('list: '+list);
  listEntry = req.body[0].entries;
  // console.log('entry: '+listEntry.entries);
  User.findById(user, function(err, foundUser){
    // console.log(foundUser.lists.length)
    foundUser.lists[list].entries.push(listEntry);
    foundUser.save(function(err){
      console.log('Added List Item');
    });
    res.send(foundUser.lists[list]);
  });
  });

  router.delete('/:id', function(req, res) {
    // console.log(req.session.userName)
    User.findOne({ userName : req.session.userName }, function(err, user) {
      // console.log(user)
      user.lists.splice(req.params.id, 1)
      user.save(function(err){
        console.log('removed list');
      });
      // console.log(user);
      res.send(user.lists);
    });
  });

  router.delete('/:id/entry/:entryIndex', function(req, res) {
    // console.log(req.session.userName)
  	User.findOne({ userName : req.session.userName }, function(err, user) {
      // console.log(user.lists[req.params.id].entries[req.params.entryIndex])
  		user.lists[req.params.id].entries.splice(req.params.entryIndex, 1)
      user.save(function(err){
        console.log('removed entry');
      });
      // console.log(user);
      res.send(user.lists[req.params.id]);
  	});
  });

module.exports = router;
