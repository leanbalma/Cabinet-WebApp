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

    /* Transforms the api array into an object needed by the tree component.
     *
     * inputData = ["ivan/gmail", "sample-item", "my-company/alarm-code", "test/yahoo-mail", "test/family-safe-code", "my-company/admin-mail"];
     *
     * outputData = [
     *   { name: 'ivan', children: [ { name: 'gmail', children: [] } ] },
     *   { name: 'sample-item', children: [] },
     *   { name: 'test', children: [ { name: 'yahoo-mail', children: [] }, { name: 'family-safe-code', children: [] } ] }
     * ]
     *
     */
    function arrayToTreeData( inputArray ) {
      console.log('inputArray/outputData');
      console.log(inputArray);
      var outputData = [];
      var groupsList = [];
      for( var element in inputArray ) {
        var group = inputArray[element].split('/')[0];
        if( groupsList.indexOf(group) < 0 ) {
          // If the group does not exist yet, add it to the groupsList and
          // create the root element for that group.
          groupsList.push(group);
          outputData.push( { 'name': group, 'children': [] } );
        }

        var groupElement = inputArray[element].split('/')[1];
        if ( groupElement !== undefined ) {
          for( var index in outputData ) {
            if( outputData[index].name === group ) {
              outputData[index].children.push({ 'group': group, 'name': groupElement, 'children':[] });
            }
          }
        }
      }
      console.log(outputData);
      return outputData;
    }

    /* Extracts node data from the string returned by the api.
     * inputData example:
     * 'my-company/admin-mail': ('account: admin@my-company.com\n'
     * 'password: qwertyuiop')
     *
     * output: { account: 'admin@my-company.com', password: 'qwertyuiop' }
     */
    function handleNodeData( inputData ) {
      var outputData = {};
      var arrayOfNodeData = inputData.split('\n');
      for( var data in arrayOfNodeData ) {
        if(arrayOfNodeData[data].indexOf('account: ') > -1) {
          // The data is the account name.
          var accountName = arrayOfNodeData[data].replace('account: ', '');
          outputData['account'] = accountName;
        }
        else if(arrayOfNodeData[data].indexOf('password: ') > -1) {
          // The data is the password.
          var password = arrayOfNodeData[data].replace('password: ', '');
          outputData['password'] = password;
        }
        else {
          // if there is no label, then takes the data as password.
          outputData['password'] = arrayOfNodeData[data];
        }
      }
      console.log('data to print');
      console.log(outputData);
      return outputData;
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

    $scope.showSelected = function(sel) {
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

    // Show/Hide password to the user.
    $scope.showPasswordClicked = function() {
      if( $scope.inputType === 'password' ) {
        $scope.inputType = 'text';
      }
      else {
        $scope.inputType = 'password';
      }
    };

  });
