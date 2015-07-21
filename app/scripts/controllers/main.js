'use strict';

/**
 * @ngdoc function
 * @name cabinetWebAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cabinetWebAppApp
 */
angular.module('cabinetWebAppApp')
  .controller('MainCtrl', function( $scope, cabinetServices, DataParser ) {
    // Scope default data.
    $scope.nodeData = {};
    $scope.inputType = 'password';

    function recoverNodeId( node ) {
      if( node.group === undefined) {
        return node.name;
      }
      else {
        return node.group + '_' + node.name;
      }
    }

    // I got the tree component from https://github.com/wix/angular-tree-control
    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: false,
      injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
      }
    };

    // Empty tree as default.
    $scope.dataForTheTree = [];

    var nodeSelected = {};
    $scope.showSelected = function(sel) {
      console.log('slected: ');
      console.log(sel);
      nodeSelected = sel;
      cabinetServices.getNodeData(sel).success( function(data) {
        console.log('Node data');
        console.log( data );
        $scope.nodeData = DataParser.handleNodeData( data );
        $scope.nodeData.group = sel.group;
        $scope.nodeData.title = sel.name;
      });
    };

    $scope.getNodes = function() {
      cabinetServices.getNodes().success( function(data) {
        console.log('from controller:');
        console.log(data);
        $scope.dataForTheTree = DataParser.arrayToTreeData( data );
      });
    };

    // Show/Hide password to the user.
    $scope.showPasswordClicked = function() {
      if( $scope.inputType === 'password' ) {
        $scope.inputType = 'text';
      }
      else {
        $scope.inputType = 'password';
      }
    };

    $scope.deleteNode = function(node) {
      console.log('node to delete:');
      console.log(node);
      var nodeToDelete = recoverNodeId( nodeSelected );
      cabinetServices.deleteNode( nodeToDelete ).success( function(data) {
        console.log('data deleted');
        console.log(data);
      });
    };

    $scope.saveNode = function( node ) {
      cabinetServices.addNode( node ).success( function() {
        console.log('save success');
      });
    };

    $scope.editNode = function( node ) {
      cabinetServices.editNode( node ).success( function() {
        console.log(' edit success');
      });
    };

  });
