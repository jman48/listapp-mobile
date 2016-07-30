(function() {
  angular.module('listapp.controllers')
    .controller('LoginCtrl', function($scope, $state, authService, statService) {

      $scope.login = function() {
        authService.login();
      };

      function refreshLogin() {
        statService.trackView('Login');
        
        if (authService.isAuthenticated()) {
          $state.go('app.lists');
        } else {
          authService.login();
        }
      }

      $scope.$on('$ionicView.enter', refreshLogin);

    });
})();
