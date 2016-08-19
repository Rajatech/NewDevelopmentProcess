var app = angular.module('billingApp');

app.config(
  function($stateProvider, $urlRouterProvider, growlProvider, USER_ROLES) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.
    state('login', {
      url: '/',
      views: {
        'menu' :{
            templateUrl: 'modules/login/views/partials/header.html'
        },
        'login' : {
          templateUrl: 'modules/login/views/partials/login.html',
          controller: 'LogInController',
          controllerAs: 'login'
        }
      }
    }).
    state('home',{

      url: '/home',
      abstract:true,
      views: {
          'menu' :{
            templateUrl: 'modules/menu/views/partials/menu.html',
            controller: 'menuCtrl',
            controllerAs: 'menu'
          }
      },
      data: {
        requireLogin: true
      }
      
    }).
    state('home.dashboard',{
      url: '/dashboard',
      views: {
          'menuContent' : {
            templateUrl: 'modules/dashboard/views/partials/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboard'
          }
      },
      accessRole: {
        role : [USER_ROLES.admin, USER_ROLES.normaluser]
      }
      
    }).
    state('home.clientEntry',{
      url: '/cEntry',
      views: {
          'menuContent' : {
            templateUrl: 'modules/client/views/partials/clientEntry.html',
            controller: 'ClientEntryController',
            controllerAs: 'client'
          }
      },
      accessRole: {
        role : [USER_ROLES.admin]
      }
      
    }).
    state('home.clientQuery',{
      url: '/cQuery',
      views: {
          'menuContent' : {
            templateUrl: 'modules/client/views/partials/clientQuery.html',
            controller: 'ClientQueryController',
            controllerAs: 'client'
          }
      }
    }).
    state('home.chargeEntry',{
      url: '/chargeEntry',
       views: {
          'menuContent' : {
            templateUrl: 'modules/charge/views/partials/chargeEntry.html',
            controller: 'ChargeEntryController',
            controllerAs : 'charge'
          }
      }
    }).
    state('home.chargeQuery',{
      url: '/chargeQuery',
       views: {
          'menuContent' : {
            templateUrl: 'modules/charge/views/partials/chargeQuery.html',
            controller: 'ChargeQueryController',
            controllerAs : 'chargeQuery'
          }
      }
    }).
    state('home.schemeEntry',{
      url: '/schemeEntry',
       views: {
          'menuContent' : {
            templateUrl: 'modules/scheme/views/partials/schemeEntry.html',
            controller: 'SchemeEntryController',
            controllerAs : 'scheme'
          }
      }
    }).
    state('home.schemeAssignmentEntry',{
      url: '/schemeAssignmentEntry',
       views: {
          'menuContent' : {
            templateUrl: 'modules/scheme/views/partials/SchemeAssignmentEntry.html',
            controller: 'SchemeAssignmentEntryController',
            controllerAs : 'sAssignment'
          }
      }
    });

    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalInlineMessages(true);

  });

//@todo : need to explore event broadcast

app.run(function($rootScope, $state){
   $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    
    var data = toState.data || {};

    var requireLogin = data.requireLogin || false;

    if (requireLogin && !$rootScope.isAnyUserLoggedIn) {
      event.preventDefault();
      //@todo: later form here a login popup will be open for instant login
      $state.go('login');
    }

    
    if(angular.isDefined(toState.accessRole)){
      var isAccessible = false;
      angular.forEach(toState.accessRole.role, function(value,key){
          if(value == $rootScope.userRole){
              isAccessible = true;
              return;
          }
      });
    }else {
      var isAccessible = true;
    }

    if(!isAccessible){
     $rootScope.$broadcast('unAuthorizedAccess', {})
     event.preventDefault();
    }

});

});