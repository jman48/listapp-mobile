(function() {
  angular.module('listapp.controllers')

    .controller('ItemsCtrl', function($scope, $stateParams, itemService, modalService, popUpService, loading, listService) {

      $scope.list = listService.getList($stateParams.listId);
      $scope.items = [];

      $scope.showOptions = function(item) {
        modalService.showItemOptions(item, getItems);
      };

      $scope.addItem = function () {
        popUpService.showNewItem($scope.list.id, getItems);
      };

      function getItems() {
        loading.show();

        itemService.getItems($scope.list.id).then(function(items) {
          $scope.items = items;
          loading.hide();
        });
      }

      $scope.$on('$ionicView.enter', getItems);

      $scope.$on('loggedOut', function() {
        $scope.items = [];
      });
    })

})();
