var express = require('express');
var app = express();
var morgan = require('morgan');
var mongojs = require('mongojs');
var db = mongojs('mongoapp',['clients','charge']);
var path = require('path');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data
/*app.use(express.static(__dirname + '/src/app/modules/client'));*/
app.use(express.static(__dirname + '/src/app'));
app.use(morgan('dev')); 

app.listen(8081, function(){
	console.log('Server running at 8081 port..');	
});

/*app.get('/', function(req,res){
	res.sendfile('./public/index.html');
});*/

app.get('/getclients', function(req,res){
	console.log('server received a get request from client..');
	db.clients.find(function(err,docs){
		console.log('Retrived data from db: ' + docs);
		res.json(docs);
	});
});

app.post('/saveNewContact', function(req,res){
	console.log('server received a get request from client to save new contact..');
	db.clients.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New contact saved..');
	});
});

app.post('/deleteContact', function(req,res){
	console.log('server received a delete request from client for object id - ' + req.body.id);

	db.clients.remove({"_id": db.ObjectId(req.body.id)},function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to delete data from db..');
	});
});


app.post('/confirmForm', function(req,res){
	db.clients.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New client entity saved..');
	});
});

app.post('/confirmChargeForm', function(req,res, collectionName){
	db.charge.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New charge entity saved..');
	});
});

app.post('/getClients', function(req,res){
	console.log('data sent to server: ' + JSON.stringify(req.body));
	db.clients.find(req.body,function(err,docs){
		console.log('Retrived data from db: ' + docs.length);
		res.json(docs);
	});
});

app.get('/data/users.json', function(req,res){
	var filepath = __dirname + '/src/app/modules/login/scripts/controllers/users.json';
	res.sendFile(path.normalize(filepath));
});

app.post('/getCounts', function(req,res){
	console.log('Fetch count based on ' + JSON.stringify(req.body));
	db.clients.aggregate([
		{"$group" : {
			_id: {clientType : "$clientType"},
			count: {$sum : 1}
		}},
		{$sort : {"count" :-1}}],function(err, result){
			console.log('Retrived data from db: ' + JSON.stringify(result.length));
			res.json(result);
		}
	);
});

app.post('/getClientsCount', function(req,res){
	console.log('Fetch clients count based on ' + JSON.stringify(req.body));
	db.clients.count({},function(err, result){
		console.log('Retrived data from db: ' + JSON.stringify(result));
		res.json(result);
	});
});

app.post('/getChargesCount', function(req,res){
	console.log('Fetch charges count based on ' + JSON.stringify(req.body));
	db.charge.count({},function(err, result){
		console.log('Retrived count from db: ' + JSON.stringify(result));
		res.json(result);
	});
});