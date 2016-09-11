//import dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var morgan = require('morgan');
var mongojs = require('mongojs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var querystring = require('querystring');
var http = require('http');
var flash = require('connect-flash');

//app initialization
var app = express();
var properties = require('./application-properties.js');
var db = mongojs('mongoapp',['clients','charge','scheme','scheme_assignment']);
mongoose.connect(properties.dbUrl);

//boduParser and cookieParse middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser('12345'));
app.use(flash());

//set static resources
/*app.use(express.static(__dirname + '/src/app/modules/client'));*/
app.use(express.static(__dirname + '/src/app'));
app.use(morgan('dev')); 

// Express Session
var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  secret: '12345',
  cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}
app.use(session(sessionOpts));

//models
var User = require(__dirname + '/src/app' + '/models/user');
// Passport init
app.use(passport.initialize());
app.use(passport.session());


app.listen(properties.serverPort, function(){
	console.log('Express Server running at ' + properties.serverPort + ' port..');	
});

//login and authentication using passport

passport.use('login',new LocalStrategy(
	{
 	 passReqToCallback : true
	},
    function(req, username, password, done) {
	   
	   console.log('Inside Passport Local strategy..\nStarting login authentication process..');

	   User.getUserByUsername(username, function(err, user){
	   	
	   		if(err) throw err;
		   	
		   	if(!user){
		   		return done(null, false, req.flash('message', 'User Not found.'));
		   	}

		   	User.comparePassword(password, user.password, function(err, isMatch){
		   		if(err) throw err;
		   		if(isMatch){
		   			return done(null, user);
		   		} else {
		   			return done(null, false, req.flash('message', 'Invalid password'));
		   		}
		   	});

	   });
  }));

passport.serializeUser(function(user, done) {
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/login',
  passport.authenticate('login', 
  		{
  		  	successRedirect:'/#/home/dashboard', 
  		    failureRedirect:'/',
  		    failureFlash : true 
  		}
  )
);

app.get('/logout', function(req, res){
	
	console.log('IN NODE SERVER : LOGOUT'+ JSON.stringify(req.user));
	req.logout();

	res.redirect('/');
});

app.get('/sendSession', function(req,res){
	res.json(req.user);
});

//request handler
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

app.post('/confirmSchemeForm', function(req,res, collectionName){
	db.scheme.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New Scheme entity saved..');
	});
});

app.post('/confirmSchemeAssignmentForm', function(req,res, collectionName){
	db.scheme_assignment.save(req.body,function(err,saved){
		if(err || !saved)
		console.log('[ERROR] Server fail to save data in db..');
		console.log('New Scheme Assignment entity saved..');
	});
});

app.post('/getClients', function(req,res){
	console.log('data sent to server: ' + JSON.stringify(req.body));
	db.clients.find(req.body,function(err,docs){
		console.log('Retrived data from db: ' + docs.length);
		res.json(docs);
	});
});

app.post('/getCharges', function(req,res){
	console.log('data sent to server: ' + JSON.stringify(req.body));
	db.charge.find(req.body,function(err,docs){
		console.log('Retrived data from db: ' + docs.length);
		res.json(docs);
	});
});

app.post('/getSchemes', function(req,res){
	console.log('data sent to server: ' + JSON.stringify(req.body));
	db.scheme.find(req.body,function(err,docs){
		console.log('Retrived data from db: ' + docs.length);
		res.json(docs);
	});
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