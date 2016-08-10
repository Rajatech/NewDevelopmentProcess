(function(){

	function MenuController($state){
	
		var vm = this;
		vm.header = 'Menu Items';
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
	};

	angular.module('billingApp')
		.controller('menuCtrl', MenuController);

})();