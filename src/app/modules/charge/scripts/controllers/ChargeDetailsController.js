(function() {

	'use strict';

	function ChargeDetailsController($scope, $http, growl, charges, DbActionHandler, DropdownConfig, $timeout, $controller, $uibModalInstance){
		var vm = this;

		vm.form = {};
		vm.form.charges = charges;
		vm.currentPage = 1;
		vm.maxSize = 5;

		vm.ok = function () {
			var selectedChargeId = vm.form.charges[vm.form.selectedIndex];
    		$uibModalInstance.close(selectedChargeId.chargeId);
  		};

  		vm.cancel = function () {
    		$uibModalInstance.dismiss('cancel');
  		};

  		vm.selectCharge = function(index){
  			vm.form.selectedIndex = index;
  			vm.ok();
  		};


	}

	angular.module('billingApp')
		.controller('ChargeDetailsController', ChargeDetailsController);

})();