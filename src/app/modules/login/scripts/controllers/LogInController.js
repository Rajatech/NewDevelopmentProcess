(function () {
	 
	'use strict';

	function LogInController($scope, $http, growl, $timeout, $state, $rootScope, $stateParams, LoginService, UserService){

		var vm = this;
		
		vm.userName = undefined;
		vm.userPassword = undefined;
		vm.userRole = undefined;

		vm.loginHandler = function(){
			LoginService.validate({userName : vm.userName, userPassword : vm.userPassword, userRole : vm.userRole});
			
			$rootScope.$on('loginFailure', function(event, data){
				alert('Hey ' + data.user +'! You are not a valid user.\nPlease check your credentials');
			});
		};

	};


	angular.module('billingApp').controller('LogInController',LogInController);


})();