(function() {

	'use strict';

	function SchemeAssignmentEntryController($scope, $http, $log, growl, SchemeAssignmentValidator, DbActionHandler, $timeout, $controller, $uibModal, DatepickerConfig){
		var vm = this;

		vm.form = {};

		angular.extend(vm, $controller('AbstractEntryController', 
						   {$scope:vm, DbActionHandler:DbActionHandler, validator : SchemeAssignmentValidator, growl : growl, entryScreenName : 'Scheme Assignment Entry',confirmUrl : '/confirmSchemeAssignmentForm'}));

		vm.init = function (argument) {
			vm.headerName = 'Scheme Assignment Entry';
			vm.form.schemeId = undefined;
			vm.form.schemeStartDate = undefined;
			vm.EditMode = true;

			$http.post('/getSchemes',{}).success(function(d) {
				$timeout(function(){
					vm.schemes = d;
				});

			});
		};

		vm.dateOptions = DatepickerConfig.dateOptions;
		vm.format = DatepickerConfig.format;

		vm.DobPopup = {
			opened: false
		};

		vm.openDobPopup = function() {
			vm.DobPopup.opened = true;
		};

		vm.open = function () {
    		var modalInstance = $uibModal.open({
				templateUrl : 'modules/scheme/views/partials/SchemeDetails.html',
				controller  : 'SchemeDetailsController',
				controllerAs : 'SchemeDetails',
				resolve: {
        			schemes: function () {
          				return vm.schemes;
        			}
      			}
			});

			modalInstance.result.then(function (selSchemeId) {
      			vm.selSchemeId = selSchemeId;
      			vm.form.schemeId = vm.selSchemeId;
    		}, function () {
      			$log.info('Modal dismissed at: ' + new Date());
    		});
		};

   		vm.init();
	}

	angular.module('billingApp')
		.controller('SchemeAssignmentEntryController', SchemeAssignmentEntryController);

})();