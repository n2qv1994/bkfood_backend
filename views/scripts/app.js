'use strict';

/**
 * @ngdoc overview
 * @name mediaApp
 * @description
 * # mediaApp
 *
 * Main module of the application.
 */
angular
  .module('bkfoodApp', [])
  .constant("URI", "http://localhost/api/")
  .constant("SERVER", "https://localhost:3000/")
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: { requiredLogin: false }
      })
      .when('/home', {
        templateUrl: 'index.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
