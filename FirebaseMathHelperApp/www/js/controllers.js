angular.module('starter.controllers', ['firebase'])

//Dashboard page controller--------------------------------------------------------------------------
.controller('DashboardCtrl', function($location)
{
    /*
    $scope.logout = function()
    {
      Session.clear();
      $location.path('/login');
    }
    */
})

//Logs page controller-------------------------------------------------------------------------------
.controller('LogsCtrl', function($scope, $cordovaSQLite )
{
  var example = angular.module('starter', ['ionic', 'ngCordova'])
    .run(function($ionicPlatform, $cordovaSQLite)
    {
      $ionicPlatform.ready(function()
      {
          // Instantiate database file/connection after ionic platform is ready.
          db = $cordovaSQLite.openDB({name:"logs.db", location:'default'});
          $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS logs (log TEXT PRIMARY KEY AUTOINCREMENT, comment TEXT)');
        })
        })
      })

//Calculator page controller--------------------------------------------------------------------------
.controller('CalculatorCtrl', function($scope)
{
  $scope.screen="";

   $scope.zero = function() {$scope.screen+="0";};
   $scope.one = function() {$scope.screen+="1";};
   $scope.two = function() {$scope.screen+="2";};
   $scope.three = function() {$scope.screen+="3";};
   $scope.four = function() {$scope.screen+="4";};
   $scope.five = function() {$scope.screen+="5";};
   $scope.six = function() {$scope.screen+="6";};
   $scope.seven = function() {$scope.screen+="7";};
   $scope.eigth = function() {$scope.screen+="8";};
   $scope.nine = function() {$scope.screen+="9";};

   $scope.plus = function() {$scope.screen+="+";};
   $scope.minus = function() {$scope.screen+="-";};
   $scope.multiply = function() {$scope.screen+="*";};
   $scope.divide = function() {$scope.screen+="/";};
   $scope.clear = function() {$scope.screen="";};

  $scope.equal=function(){$scope.screen=eval($scope.screen);};

 })

 .controller('indexCtrl', function($scope,$state) {
   $state.go('calculator', {}, {location: "replace"});
 })

.controller('LoginCtrl', function(Auth, $state)
{

  this.loginWithGoogle = function loginWithGoogle()
   {
    Auth.$authWithOAuthPopup('google')
      .then(function(authData)
      {
        $state.go('tab.dashboard');
      });
    }
//----------------------------------------------------------------------------------------
/*
this.loginWithFacebook = function loginWithFacebook()
{
  Auth.$authWithOAuthPopup('facebook')
  loginWithFacebook({ scope: 'email' }).then(
    function (response)
    {
      if (response.status === 'connected')
      {
          console.log('Facebook login succeeded', response);

          var credential = firebase.auth.FacebookAuthProvider.credential
          (
              response.authResponse.accessToken);

          firebase.auth().signInWithCredential(credential).catch(function (error)
          {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
          });

      } else
      {
          alert('Facebook login failed');
      }
  })
};
*/
//----------------------------------------------------------------------------------------
          this.loginWithTwitter = function loginWithTwitter()
           {
            Auth.$authWithOAuthPopup('twitter')
              .then(function(authData)
              {
                $state.go('tab.dashboard');
              });
            }
  });
//LoginCtrl.$inject = ['Auth', '$state'];
