//google api auth functions
var connected="connected to server file";
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  // var sendUser = function(userData) {
  //   // console.log(userData);
  //   $.post("../user/"+userData.id,
  //     {user : userData},
  //     function(data, status){
  //       console.log(data);
  //       console.log(status);
  //   });
  // }

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail());

  var id_token = googleUser.getAuthResponse().id_token;
          // console.log("ID Token: " + id_token);
  var user = {};
  user.name = profile.getName();
  user.img = profile.getImageUrl();
  user.email = profile.getEmail();
  user.id = id_token;

  console.log(user);
  var angScope = $('[ng-controller="Index as index"]').scope();
  console.log(angScope);
  angScope.user = user;
  // module.exports = profile;
  // console.log(user);
  $.post("../user/"+user.id,
    {user : user},
    function(data, status){
      console.log(data);
      console.log(status);
  });
};


// function onSuccess(googleUser) {
//   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
//   var id_token = googleUser.getAuthResponse().id_token;
//             console.log("ID Token: " + id_token);
//   // id_token = id_token;
// }
// function onFailure(error) {
//   console.log(error);
// }
// function renderButton() {
//   gapi.signin2.render('my-signin2', {
//     'scope': 'profile email',
//     'width': 240,
//     'height': 50,
//     'longtitle': true,
//     'theme': 'dark',
//     'onsuccess': onSuccess,
//     'onfailure': onFailure
//   });
// }
