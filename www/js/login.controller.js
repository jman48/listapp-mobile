(function() {
  angular.module('listapp.controllers')
    .controller('LoginCtrl', function($scope, authService) {

      $scope.login = function(username, password) {
        authService.login(username, password).then(function() {

        }, function(error) {
          $scope.error = error.message;
        });
      };
    });
})();
