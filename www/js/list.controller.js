(function() {
  angular.module('listapp.controllers')

    .controller('ListCtrl', function($scope, $http, listService, modalService, popUpService) {

      $scope.addList = addList;

      $scope.showOptions = function(list) {
        modalService.showListOptions(list, getLists);
      };

      function getLists() {
        listService.getLists().then(function(lists) {
          $scope.lists = lists;
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
