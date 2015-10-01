'use strict';

/**
 * @ngdoc overview
 * @name massagePandaRestfulTestApp
 * @description
 * # massagePandaRestfulTestApp
 *
 * Main module of the application.
 */
angular
  .module('massagePandaRestfulTestApp', [
    'ngResource',
    'ngRoute',
    'ngSocket',
    'mpControllers',
    'socControllers',
    'pandaServices',
    'restfulServices'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'testCtrl',
        controllerAs: 'test'
      })
      .when('/brc', {
        templateUrl: 'views/brc.html',
        controller: 'brcCtrl',
        controllerAs: 'brc'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
