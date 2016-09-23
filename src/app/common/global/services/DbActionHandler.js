(function() {

	'use strict';

	function DbActionHandler ($http, $log, toastr) {
		 
		var actionHandler = {};

		actionHandler.restUrl = 'http://localhost:8081';

		actionHandler.post = function(entityUrl,entity){

		 	$http.post(actionHandler.restUrl+entityUrl, entity)
		 		 .success(function(data, status, header, config) {
					toastr.info('[Success] Saved new entity..');
				 })
				 .error(function(data, status, header, config) {
					toastr.error('[Error] Fail to save entity..' + JSON.stringify(data));
				 });
		 }

		actionHandler.get = function(entityFetchUrl,entity){
			$http.get(actionHandler.restUrl+entityFetchUrl).success(function(d) {
				$timeout(function(){
					var dArr = [];
					angular.forEach(d, function(entity,index){
						dArr.push(entity);
					});
					//$scope.data = dArr;
				});

			});
		}

		 return actionHandler;
	}

	angular.module('billingApp').factory('DbActionHandler', DbActionHandler);


})();