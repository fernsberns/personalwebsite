var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var mLab = require('mongolab-data-api')('z127-aeTjCC6pmYw0HgMBkVTYrutkJiS');


var app = express();

app.use(express.static(__dirname+"/public"));
app.get('/', function(req, res){
    res.sendfile('index.html', { root: __dirname + "/public" } );
});
app.use(bodyParser.json());

var db = mongojs('mongodb://admin:pass@ds035766.mlab.com:35766/chatdb', ['listofmessages']);
var db2 = mongojs('mongodb://admin:pass@ds035766.mlab.com:35766/chatdb', ['listofusers']);
var db3 = mongojs('mongodb://admin:pass@ds035766.mlab.com:35766/chatdb', ['listofaccounts']);





//db 

app.get('/views/:name', function (req, res) {
  var name = req.params.name;
  res.render('views/' + name);
});

app.get('/listofmessages', function(req, res){
	console.log("Receive a GET request")

	db.listofmessages.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/listofmessages', function(req, res){
	console.log(req.body);
	db.listofmessages.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/listofmessages/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.listofmessages.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/listofmessages/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.listofmessages.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

//db2

app.get('/listofusers', function(req, res){
	console.log("Receive a GET request")

	db2.listofusers.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/listofusers', function(req, res){
	console.log(req.body);
	db2.listofusers.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/listofusers/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db2.listofusers.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/listofusers/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db2.listofusers.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

//db3

app.get('/listofaccounts', function(req, res){
	console.log("Receive a GET request")

	db3.listofaccounts.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/listofaccounts', function(req, res){
	console.log(req.body);
	db3.listofaccounts.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/listofaccounts/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db3.listofaccounts.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/listofaccounts',function(req,res){
	var id=req.params.id;
	console.log(id);
	db3.listofaccounts.findOne({email:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

//app.put('/listofmessages/:id',function(req,res){
//	var id=req.params.id;
//	console.log(req.body.LastName);
//	db.listofmessages.findAndModify({query:{_id:mongojs.ObjectId(id)},
//		update:{$set:{FirstName:req.body.FirstName,LastName:req.body.LastName,DName:req.body.DName,DateTime:req.body.DateTime}},
//		new:true},function(err,doc){
//			res.json(doc);
//		});
//});

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
console.log('Company server running on port 3000');
});

var io = socket(server);

io.on('connection', function(socket){
	console.log('made socket connection',socket.id)



	socket.on('refresh',function(){

		io.sockets.emit('refresh');
	});

	socket.on('refresh2',function(){

		io.sockets.emit('refresh2');
	});

	socket.on('disconnect', function(){
    console.log('user disconnected');
    	io.sockets.emit('userdisconnect');

  });

	

});

