(function() {
  angular.module('listapp.controllers')

    .controller('ItemsCtrl', function($scope, $stateParams, itemService, modalService, popUpService) {

      var listId = $stateParams.listId;
      $scope.items = [];

      (function init() {
        getItems();
      })();

      $scope.showOptions = function(item) {
        modalService.showItemOptions(item, getItems);
      };

      $scope.addItem = function () {
        popUpService.showNewItem(listId, getItems);
      };

      function getItems() {
        itemService.getItems(listId).then(function(items) {
          $scope.items = items;
        });
      }
    })

})();
