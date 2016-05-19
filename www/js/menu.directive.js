(function() {
  'use strict';

  angular.module('listapp.directives')
    .directive('menu', menu);

  function menu() {

    var menuController = ['$scope', 'authService', function($scope, authService) {
      $scope.logout = function() {
        authService.logOut();
      }
    }];

    return {
      templateUrl: 'templates/menu.html',
      controller: menuController
    };
  }
})();
