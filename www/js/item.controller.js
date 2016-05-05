(function() {
  angular.module('listapp.controllers')

    .controller('ItemsCtrl', function($scope, $stateParams, itemService, modalService) {

      var listId = $stateParams.listId;
      $scope.items = [];

      (function init() {
        getItems();
      })();

      $scope.showOptions = function(item) {
        modalService.showItemOptions(item, getItems);
      };

      function getItems() {
        itemService.getItems(listId).then(function(items) {
          $scope.items = items;
        });
      }
    })

})();
