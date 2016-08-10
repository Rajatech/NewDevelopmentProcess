(function() {

	'use strict';

	function AbstractEntryController($scope,DbActionHandler,validator,growl,entryScreenName,confirmUrl) {
		$scope.submitEntry = function () {
			var validationResult = validator.validate(this.form);
			var messages = '';
			angular.forEach(validationResult.validationMessages, function(msg, index) {
				if (messages.length == 0){
					messages = messages + msg;
				}else{
					messages = messages + '</br>' + msg;
				}
				
			});

			if (messages.length != 0) {
				growl.warning(messages, {
					ttl: -1,
					referenceId: 1
				});
				return;
			}else{
				this.headerName = entryScreenName + ' - User Confirmation'
				this.ConfirmMode = true;
			 	this.OkMode = false;
			 	this.EditMode = false;
			 	return validationResult.success;
			}
			
		},
		$scope.back = function () {
			 alert('executed...');
			 this.headerName = entryScreenName;
			 this.OkMode = false;
			 this.ConfirmMode = false;
			 this.EditMode = true;
		},
		$scope.confirmEntry = function () {
			this.headerName = entryScreenName + ' - System Confirmation';
			this.ConfirmMode = false;
			this.OkMode = true;

			DbActionHandler.saveInDB(confirmUrl,this.form);
		},
		$scope.ok = function () {
			 this.OkMode = false;
			 this.ConfirmMode = false;
			 this.EditMode = true;
			 this.init();
		}
	}
	
	angular.module('billingApp')
		.controller('AbstractEntryController', AbstractEntryController);

})();