(function() {
  'use strict';

  var app = angular.module('billingApp', ['ngTouch', 'ngCookies', 'chart.js', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.router' ,'angular-growl'])
  .constant('USER_ROLES',  {
	  all: '*',
	  admin: 'admin',
	  editor: 'editor',
	  normaluser: 'normaluser',
	  guest: 'guest'	
  });

  app.filter('startFrom', function(){
  	
		return function(data,start){
  			return data.slice(start);
  		}
  });

})();
