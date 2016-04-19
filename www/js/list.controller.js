(function() {
  angular.module('listapp.controllers')

    .controller('ListCtrl', function($scope, $http, listService, modalService) {

      $scope.$on('$ionicView.enter', function(e) {
        listService.getLists().then(function(lists) {
          $scope.lists = lists;
        })
      });

      $scope.showOptions = modalService.showListOptions;
    })

})();
