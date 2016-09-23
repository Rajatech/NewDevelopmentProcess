var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoapp');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	role: {
		type: String
	},
	provider: {
		type: String
	},
	profileId: {
		type: String
	},
	displayName: {
		type: String
	},
	picture: {
		type: String
	}
}, {collection : 'user'});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){

	newUser.password = hash;
	newUser.save(callback);

	/*bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});*/
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(newPassword, oldPassword, done) {

	if(newPassword === oldPassword){
		done(null, true);
	}else{
		done('Invalid Password', false);
	}

	/*bcrypt.compare(newPassword, oldPassword, function(err, isMatch) {
	    done(err, true);
	});*/
};