(function() {
  'use strict';

angular
    .module('billingApp')
    .config(oAuthConfig);

    /** @ngInject */
    function oAuthConfig($authProvider){
      
      $authProvider.loginUrl = '/login';
      /**
       *  Satellizer config
       */
      $authProvider.facebook({
        clientId: 'x',
        clientSecret :'x',
        url: '/login/facebook',
        redirectUri: window.location.origin + '/home/dashboard'
      });
    }
})();