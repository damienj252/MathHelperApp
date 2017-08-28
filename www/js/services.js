angular.module('starter.services', ['firebase'])

.factory('Auth', Auth);

<<<<<<< HEAD
function Auth(rootRef, $firebaseAuth)
{
=======
function Auth(rootRef, $firebaseAuth) {
>>>>>>> 5fcc7c8c3256e2de8925f9e93b99c57668c6682b
  return $firebaseAuth(rootRef);
}
Auth.$inject = ['rootRef', '$firebaseAuth'];
