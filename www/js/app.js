angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ngCordova'])

.constant('FirebaseUrl', 'https://ionicle.firebaseio.com/')

.service('rootRef', ['FirebaseUrl', Firebase])

.run(ApplicationRun)

.config(ApplicationConfig);

function ApplicationRun($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {

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
//Database ----------------------------------------------------------------------------------
var db = null;

var example = angular.module('starter', ['ionic', 'ngCordova'])
  .run(function($ionicPlatform, $cordovaSQLite) {
      $ionicPlatform.ready(function() {
          if(window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if(window.StatusBar) {
              StatusBar.styleDefault();
          }
          db = $cordovaSQLite.openDB("logs.db");
          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS logs (log text, comment text)");
      });
  });

example.controller("LogsCtrl", function($scope, $cordovaSQLite)
{

      $scope.insert = function(firstname, lastname)
      {
          var query = "INSERT INTO logs (log, comment) VALUES (?,?)";
          $cordovaSQLite.execute(db, query, [log, comment]).then(function(res) {
              console.log("INSERT LOG -> " + res.insertLog);
          }, function (err) {
              console.error(err);
          });
      }

        $scope.select = function(lastname)
        {
            var query = "SELECT log, comment FROM log WHERE comment = ?";
            $cordovaSQLite.execute(db, query, [comment]).then(function(res)
            {
                if(res.rows.length > 0)
                 {
                    console.log("SELECTED -> " + res.rows.item(0).log + " " + res.rows.item(0).comment);
                }
                else
                {
                    console.log("No results found");
                }
            }, function (err)
            {
                console.error(err);
            });
        }
      })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}
ApplicationConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
