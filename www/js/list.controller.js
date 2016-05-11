(function() {
  angular.module('listapp.controllers')

    .controller('ListCtrl', function($scope, $http, listService, modalService, popUpService, loading, $state) {

      $scope.addList = addList;
      $scope.lists = [];
      getLists();


      $scope.showOptions = function(list) {
        modalService.showEditList(list, getLists);
      };

      $scope.load = function (list) {
        $state.go('app.items', {listId: list.id})
      };

      function getLists() {
        if ($scope.lists.length === 0) {
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

      $scope.$on('$ionicView.enter', getLists);

      $scope.$on('loggedOut', function() {
        $scope.lists = [];
      });
    })

})();
