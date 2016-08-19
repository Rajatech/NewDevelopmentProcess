(function () {
	 'use strict';

	 function ChargeDetailValidator () {
	 	 var validator = {};
	 	 validator.validate = validate;
	 	 return validator; 

	 	 function validate(form){
	 	 	
	 	 	var validationMessages = [];

	 	 	function mandatory(){

	 	 		if(angular.isUndefined(form.chargeId) || form.chargeId == ''){
	 	 			validationMessages.push('Charge Id can not be empty.');
	 	 		}

	 	 		if(angular.isUndefined(form.chargeType) || form.chargeType == ''){
	 	 			validationMessages.push('Charge Type can not be empty.');
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


	 angular.module('billingApp').factory('ChargeDetailValidator', ChargeDetailValidator);
})();