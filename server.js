//Server variables
var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/plannermeanapp';

mongoose.connect(mongoDBURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//public files :D
app.use(express.static('public'));

//controller info here!
// var usersController = require('./controllers/usersController');
// app.use('/users', usersController);

//Catch all redirect
app.get('*', function(req, res){
  res.redirect('/');
});

mongoose.connection.once('open', function(){
    console.log('Hello, ready to start planning?');
})

//Port
app.listen(port, function(){
    console.log('Let\'s do dis!');
    // console.log(process.env.HELLO);
})
