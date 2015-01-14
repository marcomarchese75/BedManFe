'use strict';

/**
 * @ngdoc overview
 * @name bedManFeApp
 * @description
 * # bedManFeApp
 *
 * Main module of the application.
 */
angular
  .module('bedManFeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/degenti', {
        templateUrl: 'views/degenti.html',
        controller: 'DegentiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
