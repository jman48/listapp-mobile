(function() {
  angular.module('listapp.controllers')

    .controller('AddUserCtrl', function($scope, userModalService, userService) {
      $scope.list = userModalService.getLoadedList();
      $scope.users = [];

      var usersToAdd = [];

      $scope.update = function (searchString) {
        userService.search(searchString).then(function (users) {
          $scope.users = users;
        })
      };

      $scope.toggleUser = function (username) {
        var userIdx = usersToAdd.indexOf(username);

        if (userIdx >= 0) {
          usersToAdd.splice(userIdx, 1);
        } else {
          usersToAdd.push(username);
        }
      };

      $scope.addUsers = function () {
        userService.addUsers($scope.list, usersToAdd).then(function () {
          var modal = userModalService.getLoadedModal();
          userModalService.viewUsersModal($scope.list);
          modal.hide();
        });
      };

      $scope.removeUser = function (username) {
        userService.removeFromList(username, $scope.list);
      };

      $scope.closeModal = function () {
        userModalService.getLoadedModal().hide();
      };

      $scope.$on('$ionicView.enter', function() {
        usersToAdd = [];
      });
    })

})();
