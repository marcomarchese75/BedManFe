'use strict';

/**
 * @ngdoc function
 * @name bedManFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bedManFeApp
 */
angular.module('bedManFeApp')
  .controller('MainCtrl', function ($scope, $timeout, Rilevazione) {

    $scope.allRilevazioniData = {};

    $scope.allRilevazioniData = Rilevazione.query();

    $scope.reverse = false;
    $scope.click = function (name) {
      $scope.sort = name;
      $scope.reverse = !$scope.reverse;
    }

  });
