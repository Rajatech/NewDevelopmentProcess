(function () {
	 'use strict';

	 function ChargeValidator () {
	 	 var validator = {};
	 	 validator.validate = validate;
	 	 return validator; 

	 	 function validate(form){
	 	 	
	 	 	var validationMessages = [];

	 	 	function mandatory(){

	 	 		if(angular.isUndefined(form.chargeId) || form.chargeId == ''){
	 	 			validationMessages.push('Charge Id can not be empty.');
	 	 		}

	 	 		if(angular.isUndefined(form.chargeName) || form.chargeName == ''){
	 	 			validationMessages.push('Charge Name can not be empty.');
	 	 		}
	 	 	}

	 	 	function init(){
	 	 		mandatory();
	 	 	}

	 	 	init();

	 	 	return {
	 	 			
	 	 		validationMessages : validationMessages,
	 	 		success : (validationMessages.length > 0)? false : true
	 	 	}
	 	 }
	 }


	 angular.module('billingApp').factory('ChargeValidator', ChargeValidator);
})();