'use strict';

/**
 * @ngdoc service
 * @name cabinetWebAppApp.loginModal
 * @description
 * # loginModal
 * Service in the cabinetWebAppApp.
 */
angular.module('cabinetWebAppApp')
  .service('loginModal', function ($modal, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function assignCurrentUser (user) {
      $rootScope.currentUser = user;
      return user;
    }

    return function() {
      var instance = $modal.open({
        templateUrl: 'views/loginmodal.html',
        controller: 'LoginmodalCtrl',
        size: 'sm'
      });
      return instance.result.then(assignCurrentUser);
    };

  });
