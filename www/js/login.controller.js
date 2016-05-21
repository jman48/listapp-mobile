(function() {
  angular.module('listapp.controllers')
    .controller('LoginCtrl', function($scope, authService, $state) {

      $scope.login = function(username, password) {
        if (!username) {
          $scope.errors = 'Username is required';
        } else if (!password) {
          $scope.errors = 'Password is required';
        } else {

          authService.login(username, password).then(function() {
            $state.go('lists');
          }, function(error) {
            $scope.errors = error.message;
          });
        }
      };
    });
})();
