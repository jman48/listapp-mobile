(function() {
  angular.module('listapp.controllers')

    .controller('ItemsCtrl', function($scope, $stateParams, itemService, modalService, popUpService, loading) {

      var listId = $stateParams.listId;
      $scope.items = [];

      $scope.showOptions = function(item) {
        modalService.showItemOptions(item, getItems);
      };

      $scope.addItem = function () {
        popUpService.showNewItem(listId, getItems);
      };

      function getItems() {
        loading.show();

        itemService.getItems(listId).then(function(items) {
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
