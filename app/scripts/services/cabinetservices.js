'use strict';

/**
 * @ngdoc service
 * @name cabinetWebAppApp.cabinetServices
 * @description
 * # cabinetServices
 * Service in the cabinetWebAppApp.
 */
angular.module('cabinetWebAppApp')
  .service('cabinetServices', function ($http) {
    // The host where the rest service is.
    var cabinetHost = 'http://localhost:8000';

    return {
      // Returns all nodes.
      getNodes: function() {
        var promise = $http.get(cabinetHost + '/vault/nodes')
        .success(function(data) {
          console.log('getNodes success!');
          console.log(data);
          return data;
        })
        .error( function(error) {
          console.log('getNodes error!');
          console.log(error);
        });
        return promise;
      }
    };
  });
