//API key hidden (we don't have one but it's nice to have documentation)
require('dotenv').config();

//Server variables
var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    session = require('express-session'),
    bodyParser = require('body-parser');

//google authentication
// var OAuth2 = google.auth.OAuth2;
// var oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
// var scopes = [
//   'https://www.googleapis.com/auth/plus.me'
// ];
//
// var url = oauth2Client.generateAuthUrl({
//   access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
//   scope: scopes // If you only need one scope you can pass it as string
// });

// app.post('/user/:id', function(req,res){
//   console.log(req.params.id);
//   console.log(req.data);
// });

// app.get('/auth/google', function(req, res){
//   res.redirect(url);
// });

app.use(session({
    secret: "Planner",
    resave: false,
    saveUninitialized: false
}));

//parsers for cookies and sessions
// var cookieParser = require('cookie-parser');
// app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//models
var User = require('./app/models/users.js');

//public files :D
app.use(express.static('public'));

// required for passport
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// passport.use(new GoogleStrategy({
//     clientID: '530194881371-6uk5fahj8dugsgqhlcu21t5g0p9skq6b.apps.googleusercontent.com',
//     clientSecret: 'hNdq7d03qbhCPnarNRBC8yDW',
//     callbackURL: 'http://localhost:3000/auth/google/callback'
//   },
//   function(accessToken, refreshToken, profile, done) {
//       // console.log(profile);
//       // return done(profile.displayName + ', '+ profile.id);
//       User.findOne({ googleId: profile.id }, function (err, user) {
//         // console.log(user)
//         if(user){
//               return done(user);
//           //  return done(err, user);
//          } else {
//            User.create({name: profile.displayName, googleId: profile.id}, function(err,user){
//             //  console.log(user);
//              return done(user);
//            });
//          }
//       });
//   }
// ));


//controller info here!
var usersController = require('./app/controllers/usersController');
app.use('/users', usersController);

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
//
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     console.log("This is a check to see if this is showing: "+req.account);
//     // res.redirect('/');
//   });



//Catch all redirect
app.get('*', function(req, res){
  res.redirect('/');
});

//db setup
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/plannermeanapp';
mongoose.connect(mongoDBURI);

mongoose.connection.once('open', function(){
    console.log('Hello, ready to start planning?');
})

//Port
app.listen(port, function(){
    console.log('Let\'s do dis!');
})
