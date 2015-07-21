'use strict';

/**
 * @ngdoc service
 * @name cabinetWebAppApp.DataParser
 * @description
 * # DataParser
 * Service in the cabinetWebAppApp.
 */
angular.module('cabinetWebAppApp')
.service('DataParser', function () {
  // AngularJS will instantiate a singleton by calling "new" on this function
  return {
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
    arrayToTreeData: function( inputArray ) {
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
    },

    /* Extracts node data from the string returned by the api.
     * inputData example:
     * 'my-company/admin-mail': ('account: admin@my-company.com\n'
     * 'password: qwertyuiop')
     *
     * output: { account: 'admin@my-company.com', password: 'qwertyuiop' }
     */
    handleNodeData: function( inputData ) {
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

  }
});
