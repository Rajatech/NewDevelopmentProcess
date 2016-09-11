(function(){
	'use strict';
	function LoginService ($http, $q, UserService, USER_ROLES, $rootScope,$state) {
			
			var service = {};
			service. validate = {};
			
			service.validate = function(user){

				$http.post('/login',{username:user.userName, password:user.userPassword})
				.success(function(data,status){

	          		var isValidUser = false;
	          	
          			if(status === 200 && data.status){
          				isValidUser = true;	
          				user.userRole = USER_ROLES[data.role];
          			}
	          	

	          		if(isValidUser){
	          			UserService.setLoggedInUser({name : user.userName, password : user.userPassword, role : user.userRole});
						$rootScope.isAnyUserLoggedIn = true;
						$rootScope.userRole = user.userRole;
						$state.go('home.dashboard');
	          		}else{
	          			$rootScope.isAnyUserLoggedIn = false;
	          			$rootScope.$broadcast('loginFailure', {user : user.userName, reason : 'unauthorized access', errorCode : '401'});
	          		}
          		
        		}).error(function (data) {
			      	var isValidUser = false;
			      	$rootScope.isAnyUserLoggedIn = false;
	          		$rootScope.$broadcast('loginFailure', {user : user.userName, reason : 'unauthorized access', errorCode : '401'});
			    })
			}

			service.logout = function(){

				// create a new instance of deferred
  				var deferred = $q.defer();

				$http.get('/logout')
				.success(function(data){
	          		var isValidUser = false;
	          		$rootScope.isAnyUserLoggedIn = false;
          			$rootScope.userRole = '';	          	
          			UserService.setLoggedInUser({});
          			deferred.resolve();
        		}).error(function (data) {
			      	var isValidUser = false;
			      	$rootScope.isAnyUserLoggedIn = false;
			      	deferred.reject();
			    });

			    return deferred.promise;
			}

			return service;

	};

	angular.module('billingApp').factory('LoginService', LoginService);

})();