var request = require('request');
var JWTUtils = require('../../common/utils/JWTUtils.js');
var properties = require('../../common/config/application-properties.js');
var User = require('../../../src/app/models/user');


var fbStrategy = {} 

fbStrategy.getToken = function(req, res) {
  var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: properties.oAuth.facebook.clientSecret,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: accessToken.error.message });
    }

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message });
      }
      if (req.header('Authorization')) {
        User.findOne({ profileId: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, properties.oAuth.tokenSecret);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.provider = 'facebook';
            user.profileId = profile.id;
            user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
            user.displayName = user.displayName || profile.name;
            user.role = 'normaluser';
            user.save(function() {
              var token = JWTUtils.createJWT(user);
              res.send({ token: token, user: user });
            });
          });
        });
      } else {
        // Step 3. Create a new user account or return an existing one.
        User.findOne({ profileId: profile.id },'username password email name displayName role' ,function(err, existingUser) {
          if (existingUser) {
            var token = JWTUtils.createJWT(existingUser);
            return res.send({ token: token, user:existingUser });
          }
          var user = new User();
          user.provider = 'facebook';
          user.profileId = profile.id;
          user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.displayName = profile.name;
          user.role = 'normaluser';
          user.save(function() {
            var token = JWTUtils.createJWT(user);
            res.send({ token: token, user:user });
          });
        });
      }
    });
  });
}

module.exports = fbStrategy;