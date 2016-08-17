(function() {

	'use strict';

	function SchemeEntryController($scope, $http, $log, growl, SchemeValidator, DbActionHandler, DropdownConfig, $timeout, $controller, $uibModal){
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
			vm.entries = [];

			$http.post('/getCharges',{}).success(function(d) {
				$timeout(function(){
					vm.charges = d;
				});

			});
		};

		vm.AddEntry = function(){
			var entry = {};
			entry.chargeType = vm.form.chargeType;
			entry.chargeId = vm.form.chargeId;
			entry.makeEntryEditable = false;
			vm.entries.push(entry);
			vm.clearForm();
		};

		vm.makeEditable = function(index){
			var entry = vm.entries[index];
			entry.makeEntryEditable = true;
		}
		vm.SaveUpdate = function(index){
			var entry = vm.entries[index];
			entry.makeEntryEditable = false;
		};
		vm.CancelUpdate = function(index){
			var entry = vm.entries[index];
			entry.makeEntryEditable = false;
		};

		vm.RemoveEntry = function(index){
			vm.entries.splice(index,1);
		};

		vm.clearForm = function(){
			vm.form.chargeId = null;
			vm.form.chargeType = null;
		};
		vm.open = function (size) {
    		var modalInstance = $uibModal.open({
				templateUrl : 'modules/scheme/views/partials/ChargeDetails.html',
				controller  : 'ChargeDetailsController',
				controllerAs : 'chargeDetails',
				resolve: {
        			charges: function () {
          				return vm.charges;
        			}
      			}
			});

			modalInstance.result.then(function (selectedChargeId) {
      			vm.selectedChargeId = selectedChargeId;
      			vm.form.chargeId = vm.selectedChargeId;
    		}, function () {
      			$log.info('Modal dismissed at: ' + new Date());
    		});
		};

   		vm.init();
	}

	angular.module('billingApp')
		.controller('SchemeEntryController', SchemeEntryController);

})();