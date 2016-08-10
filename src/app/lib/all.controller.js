(function() {

	'use strict';

	function ChargeEntryController($scope, $http, growl, ChargeValidator, DbActionHandler, DropdownConfig, $timeout, $controller){
		var vm = this;

		vm.form = {};

		angular.extend(vm, $controller('AbstractEntryController', 
						   {$scope:vm, DbActionHandler:DbActionHandler, validator : ChargeValidator, growl : growl, entryScreenName : 'Charge Entry',confirmUrl : '/confirmChargeForm'}));

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

})();;(function() {

	'use strict';

	function ClientEntryController($scope, $http, clientFactory, growl, ClientValidator, DbActionHandler, DropdownConfig, DatepickerConfig, $timeout, $controller) {

		var vm = this;
		var form = {};
		vm.form = form;

		angular.extend(vm, $controller('AbstractEntryController', 
						   {$scope:vm, DbActionHandler:DbActionHandler, validator : ClientValidator, growl : growl, entryScreenName : 'Client Entry',confirmUrl : '/confirmForm'}));
		//Entry
		vm.init = function() {
				vm.headerName = 'Client Entry';
				vm.form.name = '';
				vm.form.clientId = '';
				vm.form.password = '';
				vm.form.confirmPassword = '';
				vm.form.ipAddress = '';
				vm.form.macAddress = '';
				vm.form.dt = '';
				vm.uidTypes = DropdownConfig.dropdown.client.entry.uidTypes;
				vm.clientTypes = DropdownConfig.dropdown.client.entry.clientTypes;
				vm.form.uidType = '';
				vm.form.uidNumber = '';
				vm.form.clientAge = '';
				vm.form.clientType='';
				vm.EditMode = true;
		};

		vm.init();

		vm.dateOptions = DatepickerConfig.dateOptions;
		vm.format = DatepickerConfig.format;

		vm.DobPopup = {
			opened: false
		};

		vm.openDobPopup = function() {
			vm.DobPopup.opened = true;
		};

	}
	
	angular.module('billingApp')
		.controller('ClientEntryController', ClientEntryController);

})();;(function() {

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

})();;(function () {
	 
	'use strict';

	function DashboardController($scope, $http, growl, $timeout, $state, $interval, $uibModal, $log){
		
		var vm = this;
		vm.labels = [];
		vm.data = [];
		vm.getReqData = function(dt){
    		var client = {};
    		client.name = dt;
    		return client;
    	};
    	var y = function(){
    		if(vm.temp.length > 0){
    			vm.data = [];
    			vm.labels = [];
    			for(var i=0; i<vm.temp.length; i++){
    				var clientType = vm.temp[i]._id.clientType;
    				vm.data.push(vm.temp[i].count);
    				vm.labels.push((clientType === null)? 'Not mentioned' : clientType);
    			}
    		}
    	};

    	var x = function(){
    		vm.temp = [];
  			
        $http.post('/getCounts',vm.getReqData('sofikul')).success(function(clients) {
  					if(angular.isDefined(clients)){
  						vm.temp = clients;
  					}
  			});

        $http.post('/getClientsCount',vm.getReqData('sofikul')).success(function(clientsCount) {
          if(angular.isDefined(clientsCount)){
            vm.clientsCount = clientsCount;
          }
        });

        $http.post('/getChargesCount',vm.getReqData('sofikul')).success(function(chargesCount) {
          if(angular.isDefined(chargesCount)){
            vm.chargesCount = chargesCount;
          }
        });
      };
    	
      x();
    	y();

		$interval(x,12000);

    $interval(y, 15000);
  		
		vm.hzBarChart = {};
		vm.hzBarChart.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
		vm.hzBarChart.series = ['Series A', 'Series B'];
		vm.hzBarChart.data =  [
							      [65, 59, 80, 81, 56, 55, 40],
							      [28, 48, 40, 19, 86, 27, 90]
    						  ];

    	/*$interval(function(){
    		vm.data = [30, 800, 100];
    	}, 1000000);*/

    	



    	vm.items = ['item1', 'item2', 'item3'];
    	$scope.open = function (size) {

			    var modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'ModalInstanceCtrl',
			      size: size,
			      resolve: {
			        items: function () {
			          return vm.items;
			        }
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			      vm.selected = selectedItem;
			    }, function () {
			      $log.info('Modal dismissed at: ' + new Date());
			    });
  		};
		

	};


	angular.module('billingApp').controller('DashboardController',DashboardController);


})();

angular.module('billingApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});;(function () {
	 
	'use strict';

	function LogInController($scope, $http, growl, $timeout, $state, $rootScope, $stateParams, LoginService, UserService){

		var vm = this;
		
		vm.userName = undefined;
		vm.userPassword = undefined;
		vm.userRole = undefined;

		vm.loginHandler = function(){
			LoginService.validate({userName : vm.userName, userPassword : vm.userPassword, userRole : vm.userRole});
			
			$rootScope.$on('loginFailure', function(event, data){
				alert('Hey ' + data.user +'! You are not a valid user.\nPlease check your credentials');
			});
		};

	};


	angular.module('billingApp').controller('LogInController',LogInController);


})();;(function(){

	function MenuController($state, $rootScope, UserService) {
	
		var vm = this;
		vm.header = 'Menu Items';
		vm.loggedInUser = UserService.getLoggedInUser().name;
		vm.menuList = [
			{
				name : 'Client Management',
				link : '#',
				subMenu : [
					{
						name : 'Client Entry',
						link : '/clientEntry'
					},
					{
						name : 'Client Amend',
						link : '/clientAmend'
					},
					{
						name : 'Client Cancel',
						link : '/clientCancel'
					}
				]
			},
			{
				name : 'Sys Controll',
				link : '/sysControll',
				subMenu : []
			}

		];

		vm.redirectToLogIn = function () {
			 $state.go('login');
		}
		
		$rootScope.$on('unAuthorizedAccess', function(data){
			alert('You don\'t have permission to access this.');
		});

		vm.expireSession = function(){
			UserService.expireSession();	
			$state.go('login');
		} 
		
	};

	angular.module('billingApp')
		.controller('menuCtrl', MenuController);

})();