var ChatApp = angular.module('ChatApp', []);
ChatApp.controller('ChatController', ['$scope', '$http', function($scope, $http) {
	console.log("Hello World from controller");

var socket = io.connect('http://localhost:3000');

var myVar;



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


refresh();
refresh2();

myVar = setInterval(alertFunc, 1000);

function alertFunc() {
  
	refresh3();

	refresh2();

}



$scope.addMessage= function(){
	console.log($scope.messages);
	$http.post('/listofmessages', $scope.messages).then(function(response){
		console.log(response);
		refresh();
		socket.emit('refresh');
	});
};

$scope.addUser= function(){
	console.log($scope.users);

	$http.post('/listofusers', $scope.users).then(function(response){
		console.log(response);
		refresh2();
		socket.emit('refresh2');
	});
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




$scope.removeUser=function(id){
	console.log(id);
	$http.delete('/listofusers/'+id).then(function(response){
		refresh2();
	});
};

$scope.removeScore=function(id){
	console.log(id);
	$http.delete('/listofmessages/'+id).then(function(response){
		refresh();
	});
};

$scope.editScore=function(id){
	console.log(id);
	$http.get('/listofmessages/'+id).then(function(response){
		$scope.messages=response.data;
	});
};

$scope.updateScore=function(){
	console.log($scope.messages._id);
	$http.put('/listofmessages/'+$scope.messages._id,$scope.scor).then(function(response){
		refresh();
	});
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
