(function () {
	 'use strict';

	 function ClientValidator () {
	 	 var validator = {};
	 	 validator.validate = validate;
	 	 return validator; 

	 	 function validate(form){
	 	 	
	 	 	var validationMessages = [];

	 	 	function mandatory(){

	 	 		var model = form;
				if (model.name === '') {
					validationMessages.push('Client name sholud not be empty');
				}
				if (model.clientId === '') {
					validationMessages.push('Client Id sholud not be empty');
				}
				if (model.password === '') {
					validationMessages.push('Password should not be empty.');
				}

				if (model.confirmPassword === '') {
					validationMessages.push('Confirm Password should not be empty.');
				}

				if (!angular.equals(model.password, model.confirmPassword)) {
					validationMessages.push('Password and Confirm Password should be same.');
				}

				if (model.ipAddress === '') {
					validationMessages.push('IP Address should not be empty.');
				}

				if (model.macAddress === '') {
					validationMessages.push('MAC Address should not be empty.');
				}
	 	 	}

	 	 	function init(){
	 	 		mandatory();
	 	 	}

	 	 	init();

	 	 	return {
	 	 			
	 	 		validationMessages : validationMessages,
	 	 		success : (validationMessages.length > 0)? false : true
	 	 	};
	 	 }
	 }


	 angular.module('billingApp').factory('ClientValidator', ClientValidator);
})();