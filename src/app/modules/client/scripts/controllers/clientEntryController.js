(function() {

	'use strict';

	function ClientEntryController($scope, $http, growl, ClientValidator, DbActionHandler, DropdownConfig, DatepickerConfig, $timeout, $controller) {

		var vm = this;
		var form = {};
		vm.form = form;

		angular.extend(vm, $controller('AbstractEntryController', 
						   {$scope:vm, DbActionHandler:DbActionHandler, validator : ClientValidator, growl : growl, entryScreenName : 'Client Entry',confirmUrl : '/confirmForm'}));
		//Entry
		vm.init = function() {
				vm.headerName = 'Client Entry';
				vm.form.name = '';
				vm.form.clientId = '';
				vm.form.password = '';
				vm.form.confirmPassword = '';
				vm.form.ipAddress = '';
				vm.form.macAddress = '';
				vm.form.dt = '';
				vm.uidTypes = DropdownConfig.dropdown.client.entry.uidTypes;
				vm.clientTypes = DropdownConfig.dropdown.client.entry.clientTypes;
				vm.form.uidType = '';
				vm.form.uidNumber = '';
				vm.form.clientAge = '';
				vm.form.clientType='';
				vm.EditMode = true;
		};

		vm.init();

		vm.dateOptions = DatepickerConfig.dateOptions;
		vm.format = DatepickerConfig.format;

		vm.DobPopup = {
			opened: false
		};

		vm.openDobPopup = function() {
			vm.DobPopup.opened = true;
		};

	}
	
	angular.module('billingApp')
		.controller('ClientEntryController', ClientEntryController);

})();