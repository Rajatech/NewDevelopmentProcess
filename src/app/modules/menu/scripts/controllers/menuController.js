(function(){

	function MenuController($state, $rootScope, UserService) {
	
		var vm = this;
		vm.header = 'Menu Items';
		vm.loggedInUser = UserService.getLoggedInUser().name;
		vm.menuList = [
			{
				name : 'Client Management',
				link : '#',
				subMenu : [
					{
						name : 'Client Entry',
						link : '/clientEntry'
					},
					{
						name : 'Client Amend',
						link : '/clientAmend'
					},
					{
						name : 'Client Cancel',
						link : '/clientCancel'
					}
				]
			},
			{
				name : 'Sys Controll',
				link : '/sysControll',
				subMenu : []
			}

		];

		vm.redirectToLogIn = function () {
			 $state.go('login');
		}
		
		$rootScope.$on('unAuthorizedAccess', function(data){
			alert('You don\'t have permission to access this.');
		});

		vm.expireSession = function(){
			UserService.expireSession();	
			$state.go('login');
		} 
		
	};

	angular.module('billingApp')
		.controller('menuCtrl', MenuController);

})();