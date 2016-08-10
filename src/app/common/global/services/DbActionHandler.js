(function() {

	'use strict';

	function DbActionHandler ($http) {
		 
		 var actionHandler = {};

		 actionHandler.saveInDB = function (url,reqData) {
		 
		 	$http.post(url, reqData).success(function(data, status, header, config) {
				console.log('Saved new entity..')
			}).error(function(data, status, header, config) {
				//handle error condition
			});

		 }

		 return actionHandler;
	}

	angular.module('billingApp').factory('DbActionHandler', DbActionHandler);


})();