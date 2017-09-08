var EmailApp = angular.module('EmailApp', []);
EmailApp.controller('EmailController', ['$scope', '$http', function($scope, $http) {
	console.log("Hello World from email controller");

var socket = io.connect('http://localhost:3000');

$scope.addSubscriber= function(){
	console.log($scope.subscribers);

	$http.post('/listofsubscribers', $scope.subscribers).then(function(response){
		console.log(response);
		sendEmail();
	});
};


var sendEmail = function(){

	socket.emit('sendEML');
	console.log('email sent :D');
	};

}]);
