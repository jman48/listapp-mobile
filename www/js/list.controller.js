(function() {
  angular.module('listapp.controllers')

    .controller('ListCtrl', function($scope, $http, listService, modalService) {

      $scope.$on('$ionicView.enter', getLists);

      $scope.showOptions = function(list) {
        modalService.showListOptions(list, getLists);
      };

      function getLists() {
        listService.getLists().then(function(lists) {
          $scope.lists = lists;
        })
      }
    })

})();
