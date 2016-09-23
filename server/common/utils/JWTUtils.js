var moment = require('moment');
var jwt = require('jwt-simple');
var properties = require('../config/application-properties.js');

var utils = {

		createJWT : function createJWT(user) {
					  var payload = {
					    sub: user._id,
					    iat: moment().unix(),
					    exp: moment().add(14, 'days').unix()
					  };
					  return jwt.encode(payload, properties.oAuth.tokenSecret);
					}

};

module.exports = utils;