angular.module('starter.services', ['firebase'])

.factory('Auth', Auth);

<<<<<<< HEAD
function Auth(rootRef, $firebaseAuth)
{
=======
<<<<<<< HEAD
function Auth(rootRef, $firebaseAuth)
{
=======
function Auth(rootRef, $firebaseAuth) {
>>>>>>> 5fcc7c8c3256e2de8925f9e93b99c57668c6682b
>>>>>>> 995b4fd6e5f4d764ad47a09eed5134712ebd59c8
  return $firebaseAuth(rootRef);
}
Auth.$inject = ['rootRef', '$firebaseAuth'];
