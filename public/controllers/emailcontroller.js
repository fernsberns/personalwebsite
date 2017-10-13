var EmailApp = angular.module('EmailApp', []);
EmailApp.controller('EmailController', ['$scope', '$http', function($scope, $http) {
	console.log("Hello World from email controller");

var socket = io.connect('http://localhost:3000');

$scope.addSubscriber= function(){
	console.log($scope.subscribers);

	$http.post('/listofsubscribers', $scope.subscribers).then(function(response){
		console.log(response);
		
	});
};

$scope.sendContactemail= function(){
	console.log($scope.email);

		$http.post('/sendemailtome', $scope.email).then(function(response){
		console.log(response);
		});
		// setTimeout(function (){

		// 	sendEmail2();
			
		// }, 1000);
		
};


var sendEmail = function(){

	socket.emit('sendEML');
	console.log('email sent :D');
	};

var sendEmail2 = function(){

	socket.emit('sendEML2');
	console.log('email sent :D');
	};

}]);

