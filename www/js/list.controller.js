(function() {
  angular.module('listapp.controllers')

    .controller('ListCtrl', function($scope, $http, listService, modalService, popUpService, loading) {

      $scope.addList = addList;

      $scope.showOptions = function(list) {
        modalService.showListOptions(list, getLists);
      };

      function getLists() {
        loading.show();

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
