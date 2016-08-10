(function () {
	 'use strict';

	 function DatepickerConfig () {
	 	var config = {};
	 	
	 	config.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(),
			minDate: new Date(1900, 5, 22),
			startingDay: 1
		};
	 	config.format = 'MM/dd/yyyy';

	 	return config; 
	 }

	 angular.module('billingApp').factory('DatepickerConfig', DatepickerConfig);
})();