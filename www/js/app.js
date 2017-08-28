var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ngCordova', 'ngCordova.plugins'])

.constant('FirebaseUrl', 'https://ionicle.firebaseio.com/')

.service('rootRef', ['FirebaseUrl', Firebase])

.run(ApplicationRun)


.config(ApplicationConfig);



function ApplicationRun($ionicPlatform, $rootScope, $state, $cordovaSQLite, $ngCordova)
{
  $ionicPlatform.ready(function()
  {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard)
    {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }//if
    if (window.StatusBar)
     {

      StatusBar.styleDefault();
    }//if
            //Cordova plugin - giving error plugin is not defined
            $cordovaPlugin.someFunction().then(success, error);

            var db = $cordovaSQLite.openDB({name: 'logs.db', location: 'default'});

            var db = $cordovaSQLite.openDB({ name: 'logs.db', location: 'default' });

          // Instantiate database file/connection after ionic platform is ready.
          db = $cordovaSQLite.openDB({name:"logs.db"});
          $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Data (newLog TEXT , newComment TEXT)');

          $scope.save = function(newLog, newComment)
          {
            $cordovaSQLite.execute(db, 'INSERT INTO Data(newLog, newComment) VALUES (?,?)', [newLog], [newComment])
                .then(function(result)
                {
                    $scope.statusLog = "Log saved successful, cheers!";
                    $scope.statusComment = "Comment saved successful, cheers!";
                },function(error)
                {
                  $scope.statusLog  = "Error on saving: " + error.message;
                  $scope.statusComment  = "Error on saving: " + error.message;

                })
            }

            $scope.load = function()
            {
                  // Execute SELECT statement to load message from database.
                  $cordovaSQLite.execute(db, 'SELECT * FROM logs')
                      .then(
                          function(result)
                          {
                              if (result.rows.length > 0)
                              {
                                  $scope.newLog = result.rows.item(0).log;
                                  $scope.statusLog = "Logs loaded successful, cheers!";

                                  $scope.newComment = result.rows.item(0).comment;
                                  $scope.statusComment = "Logs loaded successful, cheers!";
                              }
                          },
                          function(error)
                          {
                            $scope.statusLog  = "Error on saving: " + error.message;
                            $scope.statusComment  = "Error on saving: " + error.message;
                          });
              }

          });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
}//-----------------------------------------------------------------------------------------------------------------------------

ApplicationRun.$inject = ['$ionicPlatform', '$rootScope', '$state'];

function AuthDataResolver(Auth)
{
  return Auth.$requireAuth();
}
AuthDataResolver.$inject = ['Auth'];

function ApplicationConfig($stateProvider, $urlRouterProvider)
{

  $stateProvider

  .state('login',
  {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as ctrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab',
  {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve:
    {
      authData: AuthDataResolver
    }
  })

//Dashboard ---------------------------------------------------------------------------------
  .state('tab.dashboard',
  {
    url: '/dashboard',
    views: {
      'tab-dashboard':
      {
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
//-------------------------------------------------------------------------------------------
var example = angular.module('starter', ['ionic', 'ngCordova'])
  .run(function($ionicPlatform, $cordovaSQLite)
{

})
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}
ApplicationConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
