(function() {

	'use strict';

	function ChargeEntryController($scope, $http, growl, ChargeValidator, DbActionHandler, DropdownConfig, $timeout, $controller, $log){
		var vm = this;

		vm.form = {};

		angular.extend(vm, $controller('AbstractEntryController', 
						   {$scope:vm, DbActionHandler:DbActionHandler, validator : ChargeValidator, growl : growl, entryScreenName : 'Charge Entry',confirmUrl : '/charge', $log : $log}));

		vm.init = function (argument) {
			vm.headerName = 'Charge Entry';
			vm.form.chargeName = undefined;
			vm.form.chargeId = undefined;
			vm.form.chargeCcy = undefined;
			vm.form.chargeTimeBasis = undefined;
			vm.form.chargeAmt = undefined;
			vm.chargeTimeBasisValues = DropdownConfig.dropdown.charge.entry.chargeTimeBasis;
			vm.EditMode = true;
		}
		vm.init();
	}

	angular.module('billingApp')
		.controller('ChargeEntryController', ChargeEntryController);

})();