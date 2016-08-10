(function () {
	 
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
});