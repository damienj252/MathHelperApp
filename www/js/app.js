<<<<<<< HEAD
var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ngCordova'])
=======
<<<<<<< HEAD
var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ngCordova', 'ngCordova.plugins'])
=======
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ngCordova'])
>>>>>>> 5fcc7c8c3256e2de8925f9e93b99c57668c6682b
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8

.constant('FirebaseUrl', 'https://ionicle.firebaseio.com/')

.service('rootRef', ['FirebaseUrl', Firebase])

.run(ApplicationRun)

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8

.config(ApplicationConfig);


<<<<<<< HEAD
//ApplicationRun-----------------------------------------------------------------------------
function ApplicationRun($ionicPlatform, $rootScope, $state, $cordovaSQLite)
=======

function ApplicationRun($ionicPlatform, $rootScope, $state, $cordovaSQLite, $ngCordova)
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
{
  $ionicPlatform.ready(function()
  {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard)
    {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }//if
    if (window.StatusBar)
<<<<<<< HEAD
    {

      StatusBar.styleDefault();
    }//if

      var db = window.openDatabase({name: 'logs.db', iosDatabaseLocation: 'Library'});
      var db = window.openDatabase({ name: 'logs.db', location: 'default'});

      // Instantiate database file/connection after ionic platform is ready.
      db = $cordovaSQLite.openDatabase({name:"logs.db"});
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
        }//end of the save function

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
          }//load function

  });//end of the ready function
=======
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
=======
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
>>>>>>> 5fcc7c8c3256e2de8925f9e93b99c57668c6682b
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
<<<<<<< HEAD
}//ApplicationRun---------------------------------------------------------------------------------------------------
=======
<<<<<<< HEAD
}//-----------------------------------------------------------------------------------------------------------------------------
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8

ApplicationRun.$inject = ['$ionicPlatform', '$rootScope', '$state'];

function AuthDataResolver(Auth)
{
<<<<<<< HEAD
=======
=======
}

ApplicationRun.$inject = ['$ionicPlatform', '$rootScope', '$state'];

function AuthDataResolver(Auth) {
>>>>>>> 5fcc7c8c3256e2de8925f9e93b99c57668c6682b
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
  return Auth.$requireAuth();
}
AuthDataResolver.$inject = ['Auth'];

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
function ApplicationConfig($stateProvider, $urlRouterProvider)
{

  $stateProvider

  .state('login',
  {
<<<<<<< HEAD
=======
=======
function ApplicationConfig($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
>>>>>>> 5fcc7c8c3256e2de8925f9e93b99c57668c6682b
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as ctrl'
  })

  // setup an abstract state for the tabs directive
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
  .state('tab',
  {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve:
    {
<<<<<<< HEAD
=======
=======
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve: {
>>>>>>> 5fcc7c8c3256e2de8925f9e93b99c57668c6682b
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
      authData: AuthDataResolver
    }
  })

//Dashboard ---------------------------------------------------------------------------------
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
  .state('tab.dashboard',
  {
    url: '/dashboard',
    views: {
      'tab-dashboard':
      {
<<<<<<< HEAD
=======
=======
  .state('tab.dashboard', {
    url: '/dashboard',
    views: {
      'tab-dashboard': {
>>>>>>> 5fcc7c8c3256e2de8925f9e93b99c57668c6682b
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
//-------------------------------------------------------------------------------------------
var example = angular.module('starter', ['ionic', 'ngCordova'])
  .run(function($ionicPlatform, $cordovaSQLite)
{

})
<<<<<<< HEAD
=======
=======
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

>>>>>>> 5fcc7c8c3256e2de8925f9e93b99c57668c6682b
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}
ApplicationConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
