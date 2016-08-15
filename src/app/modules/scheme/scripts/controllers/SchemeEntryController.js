(function() {

	'use strict';

	function SchemeEntryController($scope, $http, growl, SchemeValidator, DbActionHandler, DropdownConfig, $timeout, $controller){
		var vm = this;

		vm.form = {};

		angular.extend(vm, $controller('AbstractEntryController', 
						   {$scope:vm, DbActionHandler:DbActionHandler, validator : SchemeValidator, growl : growl, entryScreenName : 'Scheme Entry',confirmUrl : '/confirmSchemeForm'}));

		vm.init = function (argument) {
			vm.headerName = 'Scheme Entry';
			vm.form.chargeId = undefined;
			vm.form.schemeId = undefined;
			vm.form.schemeName = undefined;
			vm.chargeTypes = DropdownConfig.dropdown.scheme.entry.chargeTypes;
			vm.form.chargeType = undefined;
			vm.EditMode = true;
		}
		vm.init();
	}

	angular.module('billingApp')
		.controller('SchemeEntryController', SchemeEntryController);

})();