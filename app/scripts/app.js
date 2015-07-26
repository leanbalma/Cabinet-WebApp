'use strict';

/**
 * @ngdoc overview
 * @name cabinetWebAppApp
 * @description
 * # cabinetWebAppApp
 *
 * Main module of the application.
 */
angular
  .module('cabinetWebAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'treeControl'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('welcome', {
      url: '/',
      templateUrl: 'views/welcome.html',
      // controller: 'MainCtrl',
      data: {
        requireLogin: false
      }
    })
    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      data: {
        requireLogin: true
      }
    });
    // .state('app', {
    //   abstract: true,
    //   // ...
    // })
    // .state('app.dashboard', {
    //   // child state of `app`
    //   // requireLogin === true
    // })

    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl',
    //     controllerAs: 'main'
    //   })
    //   .when('/about', {
    //     templateUrl: 'views/about.html',
    //     controller: 'AboutCtrl',
    //     controllerAs: 'about'
    //   })
    // .when('/LoginModal', {
    //   templateUrl: 'views/loginmodal.html',
    //   controller: 'LoginmodalCtrl',
    //   controllerAs: 'LoginModal'
    // })
    //   .otherwise({
    //     redirectTo: '/'
    //   });
  })
  .run( function( $rootScope, $state, loginModal ) {

    // Called every time the screen changes.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;

      if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
        console.log('show modal');
        console.log(event);
        console.log(toState);
        console.log(toParams);
        event.preventDefault();
        // get me a login modal!
        //     
        loginModal()
        .then(function () {
          console.log('submited');
          return $state.go(toState.name, toParams);

        })
        .catch(function () {
          console.log('dismissed');
          return $state.go('welcome');

        });
      }

    });
  });
