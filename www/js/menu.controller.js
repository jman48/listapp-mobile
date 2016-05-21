(function() {
  angular.module('listapp.controllers')
    .controller('menuCtrl', menuController);

  menuController.$inject = ['$scope', 'authService', '$state'];

  function menuController($scope, authService, $state) {
    $scope.logout = function() {
      authService.logOut();
      $state.go('login', {reload: true});
    }
  }
})();
