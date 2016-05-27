(function() {
  angular.module('listapp.controllers')
    .controller('LoginCtrl', function($scope, $state, authService) {

      $scope.login = function() {
        authService.login();
      };

      function refreshLogin() {
        if (authService.isAuthenticated()) {
          $state.go('app.lists');
        } else {
          authService.login();
        }
      }

      $scope.$on('$ionicView.enter', refreshLogin);

    });
})();
