(function(){

	function MenuController($state, $rootScope, $http, UserService, LoginService, $state) {
	
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
		
		vm.expireSession = function(){
		    LoginService.logout().then(function () {
		          $state.go('login');
		    });
		}

		$rootScope.$on('unAuthorizedAccess', function(data){
			alert('You don\'t have permission to access this.');
		});

	};

	angular.module('billingApp')
		.controller('menuController', MenuController);

})();