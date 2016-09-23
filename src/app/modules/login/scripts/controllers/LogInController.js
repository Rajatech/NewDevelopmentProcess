(function () {
	 
	'use strict';

	function LogInController($scope, $http, growl, $log, $timeout, $state, $rootScope, $stateParams, LoginService, UserService, $auth, toastr){

		var vm = this;
		
		vm.userName = undefined;
		vm.userPassword = undefined;
		vm.userRole = undefined;

		vm.login = function(){
			$auth.login({email : vm.userName, password : vm.userPassword})
    		.then(function(response) {
    			toastr.success('Welcome in Next Generation !', 'Hi '+ response.data.user.username);
  				$rootScope.userRole = response.data.user.role;
  				var user = response.data.user;
  				UserService.setLoggedInUser({name : user.username, password : null, role : user.role});
  				$state.go('home.dashboard');
    		})
    		.catch(function(error) {
      			toastr.error(error.data.message, 'Unauthorized Access!!!');
    		});
		};


	    $scope.isAuthenticated = function() {
      		return $auth.isAuthenticated();
    	};
	    
	    $scope.authenticate = function(provider) {
	      $auth.authenticate(provider)
	        .then(function(response) {
	          toastr.success('You have successfully logged in with ' + provider + '!', 'Hi '+ response.data.user.displayName);
  			  $rootScope.userRole = response.data.user.role;
  			  var user = response.data.user;
  			  UserService.setLoggedInUser({name : user.displayName, password : null, role : user.role});
	          $state.go('home.dashboard');
	        })
	        .catch(function(error) {
	          if (error.message) {
	          	toastr.error(error.message, 'Unauthorized Access!!!');
	            toastr.error(error.message);
	          } else if (error.data) {
	            toastr.error(error.data.message, 'Unauthorized Access!!!');
	          } else {
	          	toastr.error('You have failed to log in!!');
	          }
	        });
	    };

	};

	angular.module('billingApp').controller('LogInController',LogInController);


})();