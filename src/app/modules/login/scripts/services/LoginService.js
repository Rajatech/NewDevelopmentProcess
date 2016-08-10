(function(){
	'use strict';
	function LoginService ($http,UserService, USER_ROLES, $rootScope,$state) {
			
			var service = {};
			service. validate = {};
			
			service.validate = function(user){

				$http.get('data/users.json').then(function(res){

	          		var isValidUser = false;
	          	
	          		angular.forEach(res.data.users, function(value, key){
	          			if(user.userName == value.name && user.userPassword == value.password){
	          				isValidUser = true;	
	          				user.userRole = USER_ROLES[value.roleType];
	          				return;
	          			}
	          		});

	          		if(isValidUser){
	          			UserService.setLoggedInUser({name : user.userName, password : user.userPassword, role : user.userRole});
						$rootScope.isAnyUserLoggedIn = true;
						$rootScope.userRole = user.userRole;
						$state.go('home.dashboard');
	          		}else{
	          			$rootScope.isAnyUserLoggedIn = false;
	          			$rootScope.$broadcast('loginFailure', {user : user.userName, reason : 'unauthorized access', errorCode : '401'});
	          		}
          		
        		});
			}

			return service;

	};

	angular.module('billingApp').factory('LoginService', LoginService);

})();