(function() {
  angular.module('listapp.controllers')

    .controller('ListCtrl', function($scope, $http, listService, modalService, popUpService, loading, $state) {

      $scope.addList = addList;
      $scope.lists = [];
      getLists();


      $scope.showOptions = function(list) {
        modalService.showListOptions(list, getLists);
      };

      $scope.load = function(list) {
        $state.go('app.items', {listId: list.id})
      };

      $scope.sortableOptions = {
        orderChanged: updateOrder,
        containment: '#lists',
        containerPositioning: 'relative'
      };

      function getLists() {
        if (!$scope.lists || $scope.lists.length === 0) {
          loading.show();
        }

        listService.getLists().then(function(lists) {
          $scope.lists = lists;
          loading.hide();
        })
      }

      function addList() {
        popUpService.showNewList(getLists);
      }

      function updateOrder() {
        var orderedLists = [],
          counter = 0;

        $scope.lists.forEach(function(list) {
          orderedLists.push({id: list.id, order: counter});
          counter++;
        });

        listService.saveOrder(orderedLists);
      }

      $scope.$on('$ionicView.enter', getLists);

      $scope.$on('loggedOut', function() {
        $scope.lists = [];
      });
    })

})();
