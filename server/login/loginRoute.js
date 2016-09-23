var express = require('express');
var router = express.Router();
var loginStrategy = require('./loginStrategy.js');

router.post('/login', function(req, res) {
	console.log('execution here../login');
	return loginStrategy.getToken(req,res);
});


module.exports = router;