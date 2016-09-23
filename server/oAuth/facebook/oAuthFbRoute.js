var express = require('express');
var router = express.Router();
var fbStrategy = require('./oAuthFacebook.js');

router.post('/login/facebook', function(req, res) {
	return fbStrategy.getToken(req,res);
});

module.exports = router;