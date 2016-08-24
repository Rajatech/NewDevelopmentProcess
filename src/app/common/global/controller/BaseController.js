(function() {

	'use strict';

	function AbstractEntryController($scope,DbActionHandler,validator,growl,entryScreenName,confirmUrl,$log) {
		$scope.submitEntry = function () {
			var validationResult = validator.validate(this.form);
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
				this.headerName = entryScreenName + ' - User Confirmation'
				this.ConfirmMode = true;
			 	this.OkMode = false;
			 	this.EditMode = false;
			 	return validationResult.success;
			}
			
		},
		$scope.back = function () {
			 alert('executed...');
			 this.headerName = entryScreenName;
			 this.OkMode = false;
			 this.ConfirmMode = false;
			 this.EditMode = true;
		},
		$scope.confirmEntry = function () {
			this.headerName = entryScreenName + ' - System Confirmation';
			this.ConfirmMode = false;
			this.OkMode = true;

			DbActionHandler.post(confirmUrl,this.form);
		},
		$scope.ok = function () {
			 this.OkMode = false;
			 this.ConfirmMode = false;
			 this.EditMode = true;
			 this.init();
		}
	};

	function AbstractQueryController($scope,$http,$timeout,PaginationService,entityFetchUrl,DbActionHandler,$log) {

		$scope.disableQueryResult = function(){
			$scope.enabledInq = false;
		};

		$scope.enableQueryResult = function(){
			$scope.enabledInq = true;
		};

	
		$scope.initPagination = function () {
			var pager = PaginationService.getPager(5,$scope.data.length);
			$scope.pager = pager;
			$scope.currentPage = 1;
			$scope.totalPages = pager.totalPages;
			$scope.recordPerPage = pager.recordPerPage;
			$scope.dataGridOptions.data = $scope.data.slice($scope.pager.getStartIndex(),$scope.pager.getEndIndex());
		};
		
		$scope.chargeInquery = function(){
			$scope.enableQueryResult();
			$scope.fetchResult();	
		};
		
		$scope.getGridOptions = function(){
			$scope.dataGridOptions = {
				enableFiltering: true, 
				enableGridMenu: true, 
				enableSelectAll: true,
				exporterCsvFilename: 'data.csv',
			    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
			    exporterMenuPdf: false,
			    onRegisterApi: function(gridApi){
			      $scope.gridApi = gridApi;
			    },
			    data : []
			};
		}

		$scope.fetchResult = function() {

			$http.get(DbActionHandler.restUrl+entityFetchUrl).success(function(d) {
				$timeout(function(){
					var dArr = [];

					angular.forEach(d, function(charge,index){
						dArr.push(charge);
					});
					
					$scope.data = dArr;
					$scope.initPagination();
				});

			});
		};
	}
	
	angular.module('billingApp')
		.controller('AbstractEntryController', AbstractEntryController);

	angular.module('billingApp')
		.controller('AbstractQueryController', AbstractQueryController);

})();