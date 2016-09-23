var app = angular.module('billingApp');

app.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
 }])
.config(
  function($stateProvider, $urlRouterProvider, growlProvider, USER_ROLES) {

     /**
     * Helper auth functions
     */
    var skipIfLoggedIn = function($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    };

    var loginRequired = function($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/');
      }
      return deferred.promise;
    };

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
      },
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    }).
    state('home',{

      url: '/home',
      abstract:true,
      views: {
          'menu' :{
            templateUrl: 'modules/menu/views/partials/menu.html',
            controller: 'menuController',
            controllerAs: 'menu'
          }
      },
      resolve: {
          loginRequired: loginRequired
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

app.run(['$rootScope', '$state', '$auth', function($rootScope, $state, $auth){
   $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

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

}]);