var request = require('request');
var JWTUtils = require('../common/utils/JWTUtils.js');
var properties = require('../common/config/application-properties.js');
var User = require('../../src/app/models/user');

var normalLoginStrategy = {};

normalLoginStrategy.getToken = function(req, res) {
  
  console.log('execution here..getToken()');

  User.findOne({ email: req.body.email }, 'username password email name role', function(err, user) {
    console.log(JSON.stringify(user));
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    
    User.comparePassword(req.body.password, user.password, function(err, isMatch) {
      if (!isMatch) {
        console.log('execution in error handler...');
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
      res.send({ token: JWTUtils.createJWT(user), user : user });
    });
  });
};


module.exports = normalLoginStrategy;