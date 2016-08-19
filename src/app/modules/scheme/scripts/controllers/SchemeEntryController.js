(function() {

	'use strict';

	function SchemeEntryController($scope, $http, $log, growl, SchemeValidator, ChargeDetailValidator, DbActionHandler, DropdownConfig, $timeout, $controller, $uibModal){
		var vm = this;

		vm.form = {};

		angular.extend(vm, $controller('AbstractEntryController', 
						   {$scope:vm, DbActionHandler:DbActionHandler, validator : SchemeValidator, growl : growl, entryScreenName : 'Scheme Entry',confirmUrl : '/confirmSchemeForm'}));

		vm.init = function (argument) {
			vm.headerName = 'Scheme Entry';
			vm.chargeId = undefined;
			vm.form.schemeId = undefined;
			vm.form.schemeName = undefined;
			vm.chargeTypes = DropdownConfig.dropdown.scheme.entry.chargeTypes;
			vm.chargeType = undefined;
			vm.EditMode = true;
			vm.form.entries = [];

			$http.post('/getCharges',{}).success(function(d) {
				$timeout(function(){
					vm.charges = d;
				});

			});
		};

		vm.AddEntry = function(){

			var validationResult = ChargeDetailValidator.validate(vm);
			var messages = '';
			angular.forEach(validationResult.validationMessages, function(msg, index) {
				if (messages.length == 0){
					messages = messages + msg;
				}else{
					messages = messages + '</br>' + msg;
				}
				
			});

			if (messages.length != 0) {
				growl.warning(messages, {
					ttl: -1,
					referenceId: 1
				});
				return;
			}else{
				var entry = {};
				entry.chargeType = vm.chargeType;
				entry.chargeId = vm.chargeId;
				entry.makeEntryEditable = false;
				vm.form.entries.push(entry);
				vm.clearForm();
			}
			
		};

		vm.makeEditable = function(index){
			var entry = vm.form.entries[index];
			entry.makeEntryEditable = true;
		}
		vm.SaveUpdate = function(index){
			var entry = vm.form.entries[index];
			entry.makeEntryEditable = false;
		};
		vm.CancelUpdate = function(index){
			var entry = vm.form.entries[index];
			entry.makeEntryEditable = false;
		};

		vm.RemoveEntry = function(index){
			vm.form.entries.splice(index,1);
		};

		vm.clearForm = function(){
			vm.chargeId = null;
			vm.chargeType = null;
		};

		vm.open = function () {
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
      			vm.chargeId = vm.selectedChargeId;
    		}, function () {
      			$log.info('Modal dismissed at: ' + new Date());
    		});
		};

   		vm.init();
	}

	angular.module('billingApp')
		.controller('SchemeEntryController', SchemeEntryController);

})();