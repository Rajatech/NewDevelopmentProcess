(function() {

	'use strict';

	function ChargeQueryController($scope, $http, $filter, $controller, PaginationService, growl, $timeout) {

		var vm = this;
		vm.queryForm = {};
		vm.pager = {};

		angular.extend(vm, $controller('AbstractQueryController', 
						   {$scope:vm, $http : $http, $timeout:$timeout,PaginationService :PaginationService, entityFetchUrl : 'getCharges'}));

		vm.initQuery = function () {
			vm.headerName = 'Charge Query';
			vm.queryForm.chargeName = undefined;
			vm.queryForm.chargeId = undefined;
			vm.queryForm.chargeCcy = undefined;
			vm.queryForm.chargeTimeBasis = undefined;
			vm.disableQueryResult();
			vm.initGrid();
		};

		vm.initGrid = function () {
			vm.getGridOptions();
			var gridCols = [
						 { field: 'chargeName', displayName: 'Charge Name'},
	                     { field: 'chargeId', displayName: 'Charge Id'},
	                     { field: 'chargeCcy', displayName: 'Charge Ccy'},
	                     { field: 'chargeTimeBasis', displayName: 'Charge Time Basis'},
	                     { field: 'chargeAmt', displayName:'Charge Amount'}
                     ];

        	vm.dataGridOptions.columnDefs = gridCols;
		};
		
		vm.createNgetEntity = function(){
			var charge = {};
			if(vm.queryForm.chargeName !== ''){
				charge.chargeName = vm.queryForm.chargeName;
			}
			if(vm.queryForm.chargeId !== ''){
				charge.chargeId = vm.queryForm.chargeId;
			}
			if(vm.queryForm.chargeCcy !== ''){
				charge.chargeCcy = vm.queryForm.chargeCcy;
			}
			if(vm.queryForm.chargeTimeBasis !== ''){
				charge.chargeTimeBasis = vm.queryForm.chargeTimeBasis;
			}
			return charge;
		};

		vm.initQuery();
	}

	angular.module('billingApp')
		.controller('ChargeQueryController', ChargeQueryController);

})();