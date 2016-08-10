(function() {
  'use strict';

  var app = angular.module('billingApp', ['ngTouch', 'chart.js', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.router' ,'angular-growl'])
  .constant('USER_ROLES',  {
	  all: '*',
	  admin: 'admin',
	  editor: 'editor',
	  normaluser: 'normaluser',
	  guest: 'guest'	
  });

})();
