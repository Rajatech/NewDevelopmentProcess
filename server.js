//import dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var morgan = require('morgan');
var querystring = require('querystring');
var http = require('http');

//app initialization
var app = express();
var properties = require('./server/common/config/application-properties.js');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(flash());
app.use(express.static(__dirname + '/src/app'));
app.use(morgan('dev')); 

var sessionOpts = {
  cookie : { httpOnly: true, maxAge: 2419200000 },
  saveUninitialized: true, 
  resave: false, 
  secret: '12345',
}
app.use(session(sessionOpts));


//start the server
app.listen(properties.serverPort, function(){
	console.log('Server running at ' + properties.serverPort + ' port..');	
});

//modularization of routing in express 4
var facebookRoute = require('./server/oAuth/facebook/oAuthFbRoute.js');
var loginRoute = require('./server/login/loginRoute.js');
var apiRoutes = require('./server/restEndPoints/routes/api.endPoints.route.js');
app.use('/', facebookRoute);
app.use('/', loginRoute);
app.use('/', apiRoutes);