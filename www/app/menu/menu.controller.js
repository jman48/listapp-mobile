(function() {
  angular.module('listapp.controllers')
    .controller('menuCtrl', menuController);

  function menuController($scope, authService, userService) {
    $scope.logout = function() {
      authService.logOut();
    };

    userService.getCurrentUser().then(function(user) {
      $scope.user = user;
    });
  }
})();
