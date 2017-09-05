angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ngCordova'])

.constant('FirebaseUrl', 'https://ionicle.firebaseio.com/')

.service('rootRef', ['FirebaseUrl', Firebase], '$cordovaSQLite')

.run(ApplicationRun)


.config(ApplicationConfig);


//ApplicationRun-----------------------------------------------------------------------------
function ApplicationRun($ionicPlatform, $rootScope, $state, $cordovaSQLite, $ngStorage)
{
  $ionicPlatform.ready(function($scope, $stateParams,$cordovaSQLite)
  {
    console.log('ready');

    //if statement
    if (window.cordova && window.cordova.plugins.Keyboard)
    {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }//if
    if (window.StatusBar)
    {
        StatusBar.styleDefault();
    }//if
    //end of if's

    var db = null;

    //setDB function
    function setDB()
    {
      var db = null;
    }//setDB
    setTimeout(setDB, 10);
    console.log('Got a db variable! %s', db);

//Device--------------------------------------------------------------------------------------------------------------
    /*
    var db = $cordovaSQLite.openDatabase({name:'DOCUMENT',location:'default'}, SQLiteDatabase.CREATE_IF_NECESSARY);
    console.log('Open the database');

    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS DOCUMENT (log TEXT, comment TEXT)');
    console.log('Creates the database');

    // Instantiate database file/connection after ionic platform is ready.
    db = $cordovaSQLite.openDatabase({name:"logs.db"});
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Data (newLog TEXT , newComment TEXT)');
    */

    //if - if the statement is true run the code (cordova) for a device
    if (window.cordova && window.cordova.plugins.Keyboard)
    {
      var db = $cordovaSQLite.openDatabase({name:'logs.db',location:'default'}, SQLiteDatabase.CREATE_IF_NECESSARY);
      console.log("IOS");

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS DOCUMENT (log TEXT, comment TEXT)');
      console.log('Creates the database');
    }//if
     //else - if the statement is false run it as a browser
     else
     {
       window.sqlitePlugin = {};
       window.sqlitePlugin.openDatabase = function()
       {
         return window.openDatabase('logs.db', '1.0', 'myDatabase', 10000000);
         console.log('Creates the database');
       };


       var db = window.openDatabase('logs.db', '1.0', 'my first database', 2 * 1024 * 1024); // browser
       console.log("Open database browser");

      // var db = window.execute(db, 'CREATE TABLE IF NOT EXISTS DOCUMENT (log TEXT, comment TEXT)');
      // console.log('Creates the database');

     }//else

//Window--------------------------------------------------------------------------------------------------------------
  /*
    var db = window.openDatabase({name:'DOCUMENT',location:'default'});
    console.log('Open the database');

    window.execute(db, 'CREATE TABLE IF NOT EXISTS DOCUMENT (log TEXT, comment TEXT)');
    console.log('Creates the database');

    // Instantiate database file/connection after ionic platform is ready.
    db = window.openDatabase({name:"logs.db"});
    window.execute(db, 'CREATE TABLE IF NOT EXISTS Data (newLog TEXT , newComment TEXT)');
*/

//save----------------------------------------------------------------------------------------------------------------
console.log("Save property");

//var save = $rootScope.$new();
$rootScope.save = function(newLog, newComment)
{
  //if- save the data on the device
  if (window.cordova && window.cordova.plugins.Keyboard)
  {
      $cordovaSQLite.execute(db, 'INSERT INTO DOCUMENT(newLog, newComment) VALUES (?,?)', [newLog], [newComment])
      .then(function(result)
      {
          $scope.statusLog = "Log saved successful, cheers!";
          $scope.statusComment = "Comment saved successful, cheers!";
      },function(error)
      {
        $scope.statusLog  = "Error on saving: " + error.message;
        $scope.statusComment  = "Error on saving: " + error.message;
      })
  }//if
  //else - save the data on the browser
  else
  {
      var db = function()
      {

      window.execute(db, 'INSERT INTO DOCUMENT(newLog, newComment) VALUES (?,?)', [newLog], [newComment])
      .then(function(result)
      {
          $scope.statusLog = "Log saved successful, cheers!";
          $scope.statusComment = "Comment saved successful, cheers!";
          console.log("Save");
      },function(error)
      {
        $scope.statusLog  = "Error on saving: " + error.message;
        $scope.statusComment  = "Error on saving: " + error.message;
      })
    }//db
  }//else

}//end of the save function

//load----------------------------------------------------------------------------------------------------------------
var scope = $rootScope.$new();
scope.load = function()
{
    //if - load the data from the device
    if(window.sqlitePlugin)
    {
        // Execute SELECT statement to load message from database.
        $cordovaSQLite.execute(db, 'SELECT * FROM LOGS ORDER BY log DESC')
      .then(
          function(res) {

              if (res.rows.length > 0) {

                  $scope.newLog = res.rows.item(0).logs;
                  $scope.newComment = res.rows.item(0).comment;
                  $scope.statusLog = "Logs loaded successful, cheers!";
                  $scope.statusComment = "Logs loaded successful, cheers!";
              }
          },
          function(error) {
              $scope.statusMessage = "Error on loading: " + error.message;
          }
        );
      }//if
      else
      {
        // Execute SELECT statement to load message from database.
        window.execute(db, 'SELECT * FROM LOGS ORDER BY log DESC')
      .then(
          function(res) {

              if (res.rows.length > 0) {

                  $scope.newLog = res.rows.item(0).logs;
                  $scope.newComment = res.rows.item(0).comment;
                  $scope.statusLog = "Logs loaded successful, cheers!";
                  $scope.statusComment = "Logs loaded successful, cheers!";
              }
          },
          function(error) {
              $scope.statusMessage = "Error on loading: " + error.message;
          }
        );
      }//else
    }//load function

});//end of the ready function

$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === 'AUTH_REQUIRED') {
    $state.go('login');
  }
});
}//ApplicationRun---------------------------------------------------------------------------------------------------

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
/*var example = angular.module('starter', ['ionic', 'ngCordova'])
.run(function($ionicPlatform, $cordovaSQLite)
{
})*/
// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/login');

}
ApplicationConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
