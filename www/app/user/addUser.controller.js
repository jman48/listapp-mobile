(function() {
  angular.module('listapp.controllers')

    .controller('AddUserCtrl', function($scope, userModalService, userService) {
      $scope.list = userModalService.getLoadedList();
      $scope.users = [];

      $scope.update = function (searchString) {
        userService.search(searchString).then(function (users) {
          $scope.users = users;
        })
      };

      $scope.toggleUser = function (username) {
        var userIdx = $scope.users.indexOf(username);

        if (userIdx >= 0) {
          $scope.users.splice(userIdx, 1);
        } else {
          $scope.users.push(username);
        }
      };

      $scope.addUsers = function () {
        userService.addUsers($scope.list, $scope.users).then(function () {
          $scope.closeModal();
        });
      };

      $scope.closeModal = function () {
        userModalService.getLoadedModal().hide();
      };
    })

})();
