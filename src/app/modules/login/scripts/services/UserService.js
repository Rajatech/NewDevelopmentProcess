(function(){
	'use strict';
	function UserService ($rootScope) {
			
			var User = {};
			User. loggedInUser = {};
			User.isLoggedIn = false;
			
			User.setLoggedInUser = function(user){
				User.isLoggedIn = true;
				User.loggedInUser = user;

			}

			User.getLoggedInUser = function(){
				return User.loggedInUser;
			}

			User.isAnyUserLoggedIn = function(){
				return User.isLoggedIn;
			}

			User.expireSession = function(){
				User.loggedInUser = {};
				User.isLoggedIn = false;
				alert(JSON.stringify(User));
			}

			return {
				getLoggedInUser : User.getLoggedInUser,
				setLoggedInUser : User.setLoggedInUser,
				isAnyUserLoggedIn : User.isAnyUserLoggedIn,
				expireSession : User.expireSession
			}
	};

	angular.module('billingApp').factory('UserService', UserService);

})();