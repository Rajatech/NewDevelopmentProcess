(function() {

	'use strict';

	function SchemeDetailsController($scope, $http, growl, schemes, DbActionHandler, DropdownConfig, $timeout, $controller, $uibModalInstance){
		var vm = this;

		vm.form = {};
		vm.form.schemes = schemes;
		vm.currentPage = 1;
		vm.maxSize = 5;

		vm.ok = function () {
    		$uibModalInstance.close(vm.form.selectedIndex);
  		};

  		vm.cancel = function () {
    		$uibModalInstance.dismiss('cancel');
  		};

  		vm.selectScheme = function(schemeId){
  			vm.form.selectedIndex = schemeId;
  			vm.ok();
  		};


	}

	angular.module('billingApp')
		.controller('SchemeDetailsController', SchemeDetailsController);

})();