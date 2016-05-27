(function() {
  angular.module('listapp.controllers')
    .controller('menuCtrl', menuController);

  menuController.$inject = ['$scope', 'authService', '$state'];

  function menuController($scope, store, $state, auth) {
    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $state.go('login', {reload: true});
    }
  }
})();
