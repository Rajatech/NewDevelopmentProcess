(function () {
	 'use strict';

	 function SchemeValidator () {
	 	 var validator = {};
	 	 validator.validate = validate;
	 	 return validator; 

	 	 function validate(form){
	 	 	
	 	 	var validationMessages = [];

	 	 	function mandatory(){

	 	 		if(angular.isUndefined(form.schemeId) || form.schemeId == ''){
	 	 			validationMessages.push('Scheme Id can not be empty.');
	 	 		}

	 	 		if(angular.isUndefined(form.schemeName) || form.schemeName == ''){
	 	 			validationMessages.push('Scheme Name can not be empty.');
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


	 angular.module('billingApp').factory('SchemeValidator', SchemeValidator);
})();