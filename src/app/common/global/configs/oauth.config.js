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
        clientId: '173208663114114',
        clientSecret :'7683c34041e49c34199a642d9da3064d',
        url: '/login/facebook',
        redirectUri: window.location.origin + '/home/dashboard'
      });
    }
})();