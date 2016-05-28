(function() {
  angular.module('listapp.controllers')
    .controller('menuCtrl', menuController);

  menuController.$inject = ['$scope', 'authService'];

  function menuController($scope, authService) {
    $scope.logout = function() {
      authService.logOut();
    }
  }
})();
