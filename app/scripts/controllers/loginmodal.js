'use strict';

/**
 * @ngdoc function
 * @name cabinetWebAppApp.controller:LoginmodalCtrl
 * @description
 * # LoginmodalCtrl
 * Controller of the cabinetWebAppApp
 */
angular.module('cabinetWebAppApp')
  .controller('LoginmodalCtrl', function ($scope) {

     $scope.cancel = $scope.$dismiss;

     $scope.submit = function (password) {
       console.log('submit called');
       $scope.$close('someUser');
       // UsersApi.login(email, password).then(function (user) {
       //         $scope.$close(user);
       // });
     };

     // $scope.createNewAccount = function() {
     //   $scope.$close('canceled');
     //   $state.go('register');
     // };

  });
