var WebApp = angular.module('WebApp', ['ngRoute']);
var EMLinput;
var EML;
var PSS;
var pname;
var pdesc;

WebApp.config(['$routeProvider', function($routeProvider){

	$routeProvider
	.when('/',{
		templateUrl: 'views/landingpage.html',
		controller: 'ChatController'

	})
	.when('/home',{
		resolve: {
			"check": function($location, $rootScope){
				if($rootScope.loggedIn == true){
					$location.path('/home');
				}
				else{
					$location.path('/');
				}
			}
		},
		templateUrl: 'views/home.html',
		controller: 'ChatController'
	})
	.when('/messages',{
		resolve: {
			"check": function($location, $rootScope){
				if($rootScope.loggedIn == true){
					$location.path('/messages');
				}
				else{
					$location.path('/');
				}
			}
		},
		templateUrl: 'views/homemessages.html',
		controller: 'ChatController'
	})
	.when('/login',{
		templateUrl: 'views/login.html',
		controller: 'loginCtrl'


	})
	.when('/loginbuy',{
		templateUrl: 'views/loginbuy.html',
		controller: 'loginCtrl'


	})
	.when('/about',{
		resolve: {
			"check": function($location, $rootScope){
				if($rootScope.loggedIn == true){
					$location.path('/about');
				}
				else{
					$location.path('/');
				}
			}
		},
		templateUrl: 'views/about.html'
	})
	.when('/projects',{
		resolve: {
			"check": function($location, $rootScope){
				if($rootScope.loggedIn == true){
					$location.path('/projects');
				}
				else{
					$location.path('/');
				}
			}
		},
		templateUrl: 'views/projects.html',
		controller: 'ChatController'

	})
	.when('/signup',{
		templateUrl: 'views/signup.html',
		controller: 'ChatController'
	})
	.when('/contactus',{
		templateUrl: 'views/contactus.html',
		controller: 'ChatController'
	})
	.otherwise({
		redirectTo: '/'
	});



}]);



//logincontroller

WebApp.controller('loginCtrl', function($scope, $location, $rootScope){

var myVar;

		myVar = setInterval(alertFunc, 10);

		function alertFunc() {
  
			EMLinput = $scope.email;

		}	


	$scope.submit = function(){



	if($scope.email == EML && $scope.password == PSS ){

		$rootScope.loggedIn = true;
		$location.path('/home');
		}

	else{
		alert('invalid credentials');
		
		};
	};
	$scope.logout = function(){
		$rootScope.loggedIn = false;
		localStorage.clear();
		$window.location.reload();
	};



	
});


//chatcontroller

WebApp.controller('ChatController', ['$scope', '$http', function($scope, $http) {
	console.log("Hello World from controller");

var socket = io.connect('http://localhost:3000');

var myVar;

var uname;

var emailaddress;

var mname;

$scope.logout = function(){
$rootScope.loggedIn = false;
localStorage.clear();
$window.location.reload();
emailaddress = null;
};

var refresh=function(){
	$http.get('/listofmessages').then(function(response){
		console.log("I got the data I requested");
		$scope.listofmessages = response.data;
		$scope.messages=null;
		$( '#messageBody' ).animate({scrollTop:9999999999999999999},500);
    	$( '#loginBody' ).animate({scrollTop:9999999999999999999},500);
	});

};

var refresh3=function(){
	$http.get('/listofmessages').then(function(response){
		console.log("I got the data I requested");
		$scope.listofmessages = response.data;
	});

};
var refresh2=function(){
	$http.get('/listofusers').then(function(response){
		console.log("I got the data I requested");
		$scope.listofusers = response.data;
		$scope.users=null;
	});

};

var refresh5=function(){
	$http.get('/listofprojects').then(function(response){
		console.log("I got the data I requested");
		$scope.listofprojects = response.data;
	});

};

var refresh4=function(){
	$http.get('/listofaccounts').then(function(response){
		console.log("I got the data I requested");
		$scope.listofaccounts = response.data;
		console.log($scope.listofaccounts.length);
		console.log(EMLinput);
		for (var i = $scope.listofaccounts.length - 1; i >= 0; i--) {
			console.log($scope.listofaccounts[i].email);
			if ($scope.listofaccounts[i].email == EMLinput) {
				EML = $scope.listofaccounts[i].email;
				PSS = $scope.listofaccounts[i].password;
				$scope.mname = $scope.listofaccounts[i].fname;
				$scope.uname = 'Welcome, ' + $scope.listofaccounts[i].fname;
				$scope.emailaddress = $scope.listofaccounts[i].email;
				console.log(uname);
			};
		};
	});

};


refresh();
refresh2();
refresh4();

myVar = setInterval(alertFunc, 1000);

function alertFunc() {
  
	refresh3();

	refresh2();

	refresh4();

	refresh5();

};



$scope.addMessage= function(){
	console.log($scope.messages);
	$http.post('/listofmessages', $scope.messages).then(function(response){
		console.log(response);
		refresh();
		socket.emit('refresh');
	});
};

$scope.addProject= function(){
	console.log($scope.project);
	$http.post('/listofprojects', $scope.project).then(function(response){
		console.log(response);
		refresh5();
	});
};

$scope.addUser= function(){
	console.log($scope.accounts);

	$http.post('/listofaccounts', $scope.accounts).then(function(response){
		console.log(response);
	});

		setTimeout(function (){

			sendEmail3();

			
		}, 5000);
};

$scope.addSubscriber= function(){
	console.log($scope.subscribers);

	$http.post('/listofsubscribers', $scope.subscribers).then(function(response){
		console.log(response);
		
	});
	setTimeout(function (){

			sendEmail();
			
		}, 5000);
};


var sendEmail = function(){

	socket.emit('sendEML');
	console.log('email sent :D');
	};

var sendEmail3 = function(){

	socket.emit('sendEML3');
	console.log('email sent :D');
	};


socket.on('refresh',function(){
	refresh();
});

socket.on('refresh2',function(){
	refresh2();
});


socket.on('userdisconnect',function(){
		removeUser();
});




$scope.removeProject=function(id){
	console.log(id);
	$http.delete('/listofprojects/'+id).then(function(response){
		refresh5();
	});
};

$scope.editProject=function(id){
	console.log(id);
	$http.delete('/listofprojects/'+id).then(function(response){
		refresh5();
	});
	for (var i = $scope.listofprojects.length - 1; i >= 0; i--) {

			if ($scope.listofprojects[i]._id == id) {
				pname = $scope.listofprojects[i].name;
				pdesc = $scope.listofprojects[i].description;
				document.getElementById('name').value=pname;
				document.getElementById('desc').value=pdesc;
			};
		};
};









(function myLoop (i) {          
   setTimeout(function () {   
      gettmstmp();            
      if (--i) myLoop(i);     
   }, 1000)
})(999999999999999999999999);   


$scope.example = new Date();
     

     function gettmstmp() {
     var tmstmp = new Date();
     document.getElementById("tmstmp").value=Date();
 	

 	$scope.example = tmstmp;

	}

}]);
