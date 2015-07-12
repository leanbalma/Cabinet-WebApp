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
    $scope.nodeData = {};
    $scope.inputType = 'password';

    function arrayToTreeData( inputArray ) {
      console.log('inputArray/outputData');
      console.log(inputArray);
      var outputData = [];
      for( var element in inputArray ) {
        outputData.push( { 'name': inputArray[element], 'children': [] } );
      }
      console.log(outputData);
      return outputData;
    }

    function handleNodeData( inputData ) {
      /* inputData example:
       * 'my-company/admin-mail': ('account: admin@my-company.com\n'
       * 'password: qwertyuiop'),
       */
      var outputData = {};
      var arrayOfNodeData = inputData.split('\n');
      for( var data in arrayOfNodeData ) {
        if(arrayOfNodeData[data].indexOf('account: ') > -1) {
          // The data is the account name.
          var accountName = arrayOfNodeData[data].replace('account: ', '');
          outputData['account'] = accountName;
        }
        else if(arrayOfNodeData[data].indexOf('password: ') > -1) {
          // The data is the account name.
          var password = arrayOfNodeData[data].replace('password: ', '');
          outputData['password'] = password;
        }
        else {
          outputData['password'] = arrayOfNodeData[data];
        }
      }
      console.log('data to print');
      console.log(outputData);
      return outputData;
    }

    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
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

    $scope.dataForTheTree =
      [];
    //   [
    //   { "name" : "Joe", "age" : "21", "children" : [
    //     { "name" : "Smith", "age" : "42", "children" : []  },
    //     { "name" : "Gary", "age" : "21", "children" : [
    //       { "name" : "Jenifer", "age" : "23", "children" : [
    //         { "name" : "Dani", "age" : "32", "children" : []  },
    //         { "name" : "Max", "age" : "34", "children" : []  }
    //
    //       ] }
    //
    //     ] }
    //
    //   ] },
    //   { "name" : "Albert", "age" : "33", "children" : []  },
    //   { "name" : "Ron", "age" : "29", "children" : []  }
    //
    // ];

    $scope.showSelected = function(sel) {
      // $scope.selectedNode = sel;
      console.log('slected: ');
      console.log(sel);
      cabinetServices.getNodeData(sel).success( function(data) {
        console.log('Node data');
        console.log( data );
        $scope.nodeData = handleNodeData( data );
      });

    };

    $scope.getNodes = function() {
      cabinetServices.getNodes().success( function(data) {
        console.log('from controller:');
        console.log(data);
        $scope.dataForTheTree = arrayToTreeData( data );
      });
    };

    $scope.showPasswordClicked = function() {
      if( $scope.inputType === 'password' ) {
        $scope.inputType = 'text';
      }
      else {
        $scope.inputType = 'password';
      }
    };

  });
