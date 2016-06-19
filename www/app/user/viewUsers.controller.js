(function() {
  angular.module('listapp.controllers')

    .controller('ViewUserCtrl', function($scope, userModalService, userService, popUpService) {
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
        popUpService.showConfirm(removeUser, 'Delete from list', 'Are you sure you want to remove the user from this list?');

        function removeUser() {
          userService.removeListUser(userId, $scope.list).then(update);
        }
      };
    })

})();
