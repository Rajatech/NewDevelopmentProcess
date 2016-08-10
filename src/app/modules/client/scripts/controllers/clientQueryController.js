(function() {

	'use strict';

	function ClientQueryController($scope, $http, $filter, clientFactory, PaginationService, growl, $timeout) {

		var vm = this;
		vm.queryForm = {};
		vm.pager = {};

		vm.initQuery = function () {
			vm.headerName = 'Client Query';
			vm.queryForm.name = undefined;
			vm.queryForm.clientId = undefined;
			vm.queryForm.ipAddress = undefined;
			vm.queryForm.macAddress = undefined;
			vm.disableQueryResult();
			vm.initGrid();
		};
		
		vm.disableQueryResult = function(){
			vm.enabledCustInq = false;
		};

		vm.enableQueryResult = function(){
			vm.enabledCustInq = true;
		};

		vm.initGrid = function () {
			 vm.dataGridOptions = {
				enableFiltering: true, 
				enableGridMenu: true, 
				enableSelectAll: true,
				exporterCsvFilename: 'clients.csv',
			    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
			    exporterMenuPdf: false,
			    onRegisterApi: function(gridApi){
			      vm.gridApi = gridApi;
			    },
			    data : []

			};
			var gridCols = [
						 { field: 'name', displayName: 'Client Name'},
	                     { field: 'clientId', displayName: 'Client Id'},
	                     { field: 'uidType', displayName: 'UID Type'},
	                     { field: 'uidNumber', displayName: 'UID Number'},
	                     { field: 'dt', displayName:'DOB'},
	                     { field: 'ipAddress', displayName:'IP Address'},
	                     { field: 'macAddress', displayName:'MAC Address'}
                     ];

        	vm.dataGridOptions.columnDefs = gridCols;
		};
		vm.initQuery();
		vm.initPagination = function () {
			var pager = PaginationService.getPager(5,vm.clients.length);
			vm.pager = pager;
			vm.currentPage = 1;
			vm.totalPages = pager.totalPages;
			vm.recordPerPage = pager.recordPerPage;
			vm.dataGridOptions.data = vm.clients.slice(vm.pager.getStartIndex(),vm.pager.getEndIndex());
		};
		
		vm.createNgetClient = function(){
			var client = {};
			if(vm.queryForm.name !== ''){
				client.name = vm.queryForm.name;
			}
			if(vm.queryForm.clientId !== ''){
				client.clientId = vm.queryForm.clientId;
			}
			if(vm.queryForm.ipAddress !== ''){
				client.ipAddress = vm.queryForm.ipAddress;
			}
			if(vm.queryForm.macAddress !== ''){
				client.macAddress = vm.queryForm.macAddress;
			}
			return client;
		};

		vm.customerInquery = function(){
			vm.enableQueryResult();
			vm.fetchResult();	
		};
		

		//Query
		vm.fetchResult = function() {

			$http.post('/getClients',vm.createNgetClient()).success(function(data) {
				$timeout(function(){
					vm.clients = data;
					vm.initPagination();
				});

			});
		};

	}

	angular.module('billingApp')
		.controller('ClientQueryController', ClientQueryController);

})();