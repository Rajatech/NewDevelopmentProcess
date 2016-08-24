(function() {

	'use strict';

	function DbActionHandler ($http,$log) {
		 
		var actionHandler = {};

		actionHandler.restUrl = 'http://localhost:8080/';

		actionHandler.post = function(entityUrl,entity){

		 	$http.post(actionHandler.restUrl+entityUrl, entity)
		 		 .success(function(data, status, header, config) {
					$log('[Success] Saved new entity..' + JSON.stringify(data));
				 })
				 .error(function(data, status, header, config) {
					$log('[Error] Fail to save entity..' + JSON.stringify(data));
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