(function() {
  angular.module('listapp.controllers')

    .controller('ViewUserCtrl', function($scope, userModalService, userService) {
      $scope.list = userModalService.getLoadedList();
      $scope.users = [];

      userService.getListUsers($scope.list).then(function(users) {
        $scope.users = users;
      });

      $scope.closeModal = function () {
        userModalService.getLoadedModal().hide();
      };
    })

})();
