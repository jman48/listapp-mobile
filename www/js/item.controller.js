(function() {
  angular.module('listapp.controllers')

    .controller('ItemsCtrl', function($scope, $stateParams, itemService, modalService) {

      var listId = $stateParams.listId;
      $scope.items = [];

      itemService.getItems(listId).then(function(items) {
        $scope.items = items;
      });

      $scope.showOptions = function(item) {
        modalService.showItemOptions(item);
      }
    })

})();
