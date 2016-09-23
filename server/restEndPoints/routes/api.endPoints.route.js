var mongo = require('mongodb');
var mongojs = require('mongojs');
var db = mongojs('mongoapp',['clients','charge','scheme','scheme_assignment']);

var express = require('express');
var endPointsRoute = express.Router();


endPointsRoute.get('/getclients', function(req,res){
	db.clients.find(function(err,docs){
		console.log('Retrived data from db: ' + docs);
		res.json(docs);
	});
});

endPointsRoute.post('/saveNewContact', function(req,res){
	db.clients.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New contact saved..');
	});
});

endPointsRoute.post('/deleteContact', function(req,res){
	db.clients.remove({"_id": db.ObjectId(req.body.id)},function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to delete data from db..');
	});
});


endPointsRoute.post('/confirmForm', function(req,res){
	db.clients.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New client entity saved..');
	});
});

endPointsRoute.post('/confirmChargeForm', function(req,res, collectionName){
	db.charge.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New charge entity saved..');
	});
});

endPointsRoute.post('/confirmSchemeForm', function(req,res, collectionName){
	db.scheme.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New Scheme entity saved..');
	});
});

endPointsRoute.post('/confirmSchemeAssignmentForm', function(req,res, collectionName){
	db.scheme_assignment.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New Scheme Assignment entity saved..');
	});
});

endPointsRoute.post('/getClients', function(req,res){
	db.clients.find(req.body,function(err,docs){
		console.log('Retrived data from db: ' + docs.length);
		res.json(docs);
	});
});

endPointsRoute.post('/getCharges', function(req,res){
	db.charge.find(req.body,function(err,docs){
		console.log('Retrived data from db: ' + docs.length);
		res.json(docs);
	});
});

endPointsRoute.post('/getSchemes', function(req,res){
	db.scheme.find(req.body,function(err,docs){
		console.log('Retrived data from db: ' + docs.length);
		res.json(docs);
	});
});

endPointsRoute.post('/getCounts', function(req,res){
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

endPointsRoute.post('/getClientsCount', function(req,res){
	db.clients.count({},function(err, result){
		console.log('Retrived data from db: ' + JSON.stringify(result));
		res.json(result);
	});
});

endPointsRoute.post('/getChargesCount', function(req,res){
	db.charge.count({},function(err, result){
		console.log('Retrived count from db: ' + JSON.stringify(result));
		res.json(result);
	});
});



module.exports = endPointsRoute;
