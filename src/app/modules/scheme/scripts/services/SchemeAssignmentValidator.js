(function () {
	 'use strict';

	 function SchemeAssignmentValidator () {
	 	 var validator = {};
	 	 validator.validate = validate;
	 	 return validator; 

	 	 function validate(form){
	 	 	
	 	 	var validationMessages = [];

	 	 	function mandatory(){

	 	 		if(angular.isUndefined(form.schemeId) || form.schemeId == ''){
	 	 			validationMessages.push('Scheme Id can not be empty.');
	 	 		}

	 	 		if(angular.isUndefined(form.schemeStartDate) || form.schemeStartDate == ''){
	 	 			validationMessages.push('Scheme Start Date can not be empty.');
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


	 angular.module('billingApp').factory('SchemeAssignmentValidator', SchemeAssignmentValidator);
})();