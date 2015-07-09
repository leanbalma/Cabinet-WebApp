'use strict';

/**
 * @ngdoc function
 * @name cabinetWebAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cabinetWebAppApp
 */
angular.module('cabinetWebAppApp')
  .controller('MainCtrl', function( $scope, cabinetServices ) {

    $scope.getNodes = function() {
      cabinetServices.getNodes().success( function(data) {
        console.log('from controller:');
        console.log(data);
      } );
    };

  });
