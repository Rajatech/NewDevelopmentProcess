(function () {
	 
	'use strict';

	function LogInController($scope, $http, growl, $timeout, $state, $rootScope, $stateParams, LoginService, UserService){

		var vm = this;
		
		vm.userName = undefined;
		vm.userPassword = undefined;
		vm.userRole = undefined;

		vm.loginHandler = function(){
			console.log('inside login handler');
			LoginService.validate({userName : vm.userName, userPassword : vm.userPassword, userRole : vm.userRole});
			
			$rootScope.$on('loginFailure', function(event, data){
				alert('Could\'nt log in\n' + data.reason);
			});
		};

	};


	angular.module('billingApp').controller('LogInController',LogInController);


})();