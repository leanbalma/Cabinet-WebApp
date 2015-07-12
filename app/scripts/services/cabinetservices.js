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
        var promise = $http.get(cabinetHost + '/vault/nodes');
        return promise;
      },
      // Returns the node's data.
      getNodeData: function( nodeSelected ) {
        var node = '';

        if( nodeSelected.group ) {
          // If the node has a group, then ask for group_node-name
          node = nodeSelected.group + '_' + nodeSelected.name;
        }
        else {
          // If the node has not a group, then ask for name.
          node = nodeSelected.name;
        }

        var promise = $http.get(cabinetHost + '/vault/nodes/' + node);
        return promise;
      }
    };
  });
