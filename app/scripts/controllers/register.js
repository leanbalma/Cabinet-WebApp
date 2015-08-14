'use strict';

/**
 * @ngdoc function
 * @name cabinetWebAppApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the cabinetWebAppApp
 */
angular.module('cabinetWebAppApp')
  .controller('RegisterCtrl', function ($scope, cabinetServices) {

    $scope.user = {
      name: undefined,
      email: undefined,
      password: undefined,
      rPassword: undefined
    };

    $scope.registerUser = function(name, email, password) {
      // console.log(name);
      cabinetServices.addUser( name, email, password )
      .success( function(response) {
          console.log('returned');
          console.log(response);
      });
    };


  });
