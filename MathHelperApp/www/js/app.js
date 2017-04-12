angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

.constant('FirebaseUrl', 'https://ionicle.firebaseio.com/')

.service('rootRef', ['FirebaseUrl', Firebase])

.run(ApplicationRun)

.config(ApplicationConfig);

function ApplicationRun($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });

}
ApplicationRun.$inject = ['$ionicPlatform', '$rootScope', '$state'];

function AuthDataResolver(Auth) {
  return Auth.$requireAuth();
}
AuthDataResolver.$inject = ['Auth'];

function ApplicationConfig($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as ctrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve: {
      authData: AuthDataResolver
    }
  })

//Dashboard ---------------------------------------------------------------------------------
  .state('tab.dashboard', {
    url: '/dashboard',
    views: {
      'tab-dashboard': {
        templateUrl: 'templates/tab-dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })
//Logs -------------------------------------------------------------------------------------
  .state('tab.logs', {
      url: '/logs',
      views: {
        'tab-logs': {
          templateUrl: 'templates/tab-logs.html',
          controller: 'LogsCtrl'
        }
      }
    })
//Calculator -------------------------------------------------------------------------------
  .state('tab.calculator', {
    url: '/calculator',
    views: {
      'tab-calculator': {
        templateUrl: 'templates/tab-calculator.html',
        controller: 'CalculatorCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}
ApplicationConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
