(function() {
  angular.module('listapp.controllers')

    .controller('ViewUserCtrl', function($scope, userModalService, userService) {
      $scope.list = userModalService.getLoadedList();
      $scope.users = [];

      update();

      function update() {
        userService.getListUsers($scope.list).then(function(users) {
          $scope.users = users;
        });
      }

      $scope.closeModal = function () {
        userModalService.getLoadedModal().hide();
      };

      //Close this modal and show the add user modal
      $scope.addUsers = function() {
        var modal = userModalService.getLoadedModal();
        userModalService.addUserModal($scope.list);
        modal.hide();
      };

      $scope.removeUser = function (userId) {
        userService.removeListUser(userId, $scope.list).then(update);
      };
    })

})();
