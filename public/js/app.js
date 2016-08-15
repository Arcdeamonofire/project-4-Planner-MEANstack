var app = angular.module('PlannerApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({enabled:true});

	$routeProvider.when('/', {
		templateUrl: 'partials/home.html'
	}).when('/signup', {
		templateUrl: 'partials/signup.html',
		controller: 'SignUp',
		controllerAs: 'submit'
	}).when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LogIn',
		controllerAs: 'login'
	}).when('/users/:id', {
		templateUrl: 'partials/users.html',
		controller: 'Index',
		controllerAs: 'index'
	}).when('/logout', {
		templateUrl: 'partials/logout.html',
		controller: 'LogOut',
		controllerAs: 'logout'
	}).when('/event/new', {
		templateUrl: 'partials/events/newEvent.html',
		controller: 'Index',
		controllerAs: 'index'
	}).when('/list/new', {
		templateUrl: 'partials/lists/newList.html',
		controller: 'Index',
		controllerAs: 'index'
	}).when('/event/:id', {
		templateUrl: 'partials/events/showEvent.html',
		controller: 'Event',
		controllerAs: 'event'
	}).when('/list/:id', {
		templateUrl: 'partials/lists/showList.html',
		controller: 'List',
		controllerAs: 'list'
	});
}]);

app.controller('Index', ['$http', '$scope','$location', function($http, $scope,$location) {
	console.log('this is the index page');
	var index = this;
	//Controls nav bar and front-end user view: True = no user, False = user
	$scope.noUser = true;

	//Parent recieves login info
	$scope.$on('getUser', function(event, data){
		index.user = data.userLogged;
		$scope.user = index.user;
		// console.log($scope.user);
		if ($scope.user.userName !== undefined) { //nav bar links, w/o final suffix = bad PW return user profile
			index.navVar = 'WELCOME, ' + index.user.userName;
			index.navLink = '/users/{{index.user._id}}';
			$scope.noUser = false;
		};
	});

	this.newEvent = function(){
		$http({
			method:'POST',
			url: '/event/new',
			data: this.form
		}).then(function(result){
			console.log('added event');
			console.log(result);
			console.log($scope.user)
			$scope.user.events = result.data;
			$location.url('/users/'+$scope.user._id);
		})
	};

	this.newList = function(){
		$http({
			method:'POST',
			url: '/list/new',
			data: this.form
		}).then(function(result){
			console.log('added list');
			console.log(result);
			console.log($scope.user)
			$scope.user.lists = result.data;
			$location.url('/users/'+$scope.user._id);
		})
	};

}]);

app.controller('List', ['$http', '$scope','$location','$routeParams', function($http, $scope,$location,$routeParams) {
	// console.log($scope.user);
	// console.log($routeParams);
	var list = this;
	list.id = $routeParams.id
	console.log(this.id);

	this.newListItem = function(){
		$http({
			method:'POST',
			url: '/list/newItem',
			data: [this.form,$scope.user._id,list.id]
		}).then(function(result){
			console.log('added item');
			console.log(result.data);
			// console.log($scope.user)
			$scope.user.lists[list.id] = result.data;
			$location.url('/list/'+list.id);
		});
	};

	this.delete = function() {
		$http({
			method: 'DELETE',
			url: '/list/' + $routeParams.id
		}).then(function(result) {
			console.log(result.data)
			console.log()
			$scope.user.lists = result.data;
			$location.url('/users/'+$scope.user._id);
		})
	}

	this.deleteEntry = function(entryIndex) {
		$http({
			method: 'DELETE',
			url: '/list/'+$routeParams.id+'/entry/'+entryIndex
		}).then(function(result) {
			console.log(result.data)
			console.log()
			$scope.user.lists[list.id] = result.data;
			$location.url('/list/'+list.id);
		})
	}

}]);



app.controller('Event', ['$http', '$scope','$location','$routeParams', function($http, $scope,$location,$routeParams) {
	var event = this;
	event.id = $routeParams.id
	console.log(event.id)

	event.delete = function() {
		$http({
			method: 'DELETE',
			url: '/event/' + $routeParams.id
		}).then(function(result) {
			console.log(result.data)
			console.log()
			$scope.user.events = result.data;
			$location.url('/users/'+$scope.user._id);
		})
	}
}]);

//Sign Up
app.controller('SignUp', ['$http', '$scope', '$location', '$window', function($http, $scope, $location, $window) {
	console.log('this is the sign up page');
	$scope.badPassword = false;

	this.signUp = function() {
		console.log('Adding a new user');
		// console.log('Planeswalker\'s data: ', this.form);

		$http({
			method: 'POST',
			url: '/users',
			data: this.form
		}).then(function(result){
			// console.log(result)
			if(result.data !== ""){
				console.log(result.data);
				userLogged = result.data;
				$scope.$emit('getUser', {
					userLogged: userLogged
			});
				console.log('Welcome')
				$location.url('/users/'+userLogged._id);
			} else {
				// console.log('Username already exists pls try again')
				console.log('I\'m sorry but that name is already in use, please try again, we wouldn\'t want identity theft would we?')
				$scope.badPassword = true;
			}
		});
	}
}]);

//Log In
app.controller('LogIn', ['$http', '$scope', '$location', '$route', function($http, $scope, $location, $route) {
	console.log('this is the log in page');

	$scope.badPassword = false;

	this.logIn = function() {
		console.log('a Planeswalker is logging in!');
		// console.log('Planeswalker\'s data: ', this.form);

		$http({
			method: 'POST',
			url: '/users/login',
			data: this.form
		}).then(function(result){
			// console.log(result.data);
			if (result.data !== 'failed'){
				userLogged = result.data;
				$scope.$emit('getUser', {
					userLogged: userLogged
				});
				console.log('redirecting to your user page');
				// console.log(userLogged)
				$location.url('/users/'+userLogged._id);
			}else {
				console.log('you typed the wrong password buddy')
				$scope.badPassword = true;
			}
		});
	}
}]);

//Log Out
app.controller('LogOut', ['$http', '$scope', '$location', '$route', function($http, $scope, $location, $route) {
	console.log('this is the log out page');

	this.logOut = function() {
		console.log('a Planeswalker is logging in!');
		// console.log('Planeswalker\'s data: ', this.form);

		$http({
			method: 'POST',
			url: '/users/logout',
			data: this.form
		}).then(function(result){
			console.log(result);
			userLogged = null;
			$scope.$emit('getUser', {
				userLogged: userLogged
			});
			$scope.$parent.noUser = true;
			console.log('redirecting to home');
			// $location.url('/');
			location.reload();
		});
	}

}]);






// app.controller('Index', ['$http', '$scope','$location', function($http, $scope,$location) {
//   console.log('index page shell has loaded!')
// 	var index = this;
// 	this.signed = false;
// 	$scope.token ='none';
// 	this.user = $scope.user;
//
// 	$scope.$on('$routeChangeSuccess', function () {
// 		console.log($scope.user);
// 		console.log(this.user);
// 	});
//
//
//
// }]);

// app.controller('User', ['$http', '$scope', function($http, $scope){
// 	var user = this;
// 	var googleUser;
// 	user.silly = "Hello";
//
// 		// console.log(gapi.auth2.getAuthInstance())
// 		// console.log(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName());
// 		// console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
// 		googleUser = gapi.auth2.getAuthInstance().currentUser.get();
// 		console.log(googleUser.isSignedIn());
// 		profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
// 		console.log(googleUser);
// 		console.log(profile);
// 		console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
// 		console.log('Name: ' + profile.getName());
// 		console.log('Image URL: ' + profile.getImageUrl());
// 		console.log('Email: ' + profile.getEmail());
//
// 		var id_token = googleUser.getAuthResponse().id_token;
// 		console.log("ID Token: " + id_token);
//
//
// 		user.profile = profile;
//
// }])

// this.onSignIn = function(){
// 	gapi.load('auth2', function() {
//
// 	gapi.auth2.init({
// 			client_id: '530194881371-6uk5fahj8dugsgqhlcu21t5g0p9skq6b.apps.googleusercontent.com',
// 		}).then(function(){
//
// 			auth2 = gapi.auth2.getAuthInstance();
// 			auth2.signIn().then(function () {
// 				console.log('User signed in.');
// 				index.signed = auth2.isSignedIn.get();
// 				console.log(index.signed)
//
// 				googleUser = gapi.auth2.getAuthInstance().currentUser.get();
// 				console.log(googleUser.isSignedIn());
// 				profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
// 				// console.log(googleUser);
// 				// console.log(profile);
// 				console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
// 				console.log('Name: ' + profile.getName());
// 				console.log('Image URL: ' + profile.getImageUrl());
// 				console.log('Email: ' + profile.getEmail());
// 				var id_token = googleUser.getAuthResponse().id_token;
// 				console.log("ID Token: " + id_token);
// 				$scopen.token = id_token;
// 			});
// 		});
// 	});
// };
