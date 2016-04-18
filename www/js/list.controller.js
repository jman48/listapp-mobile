(function() {
  angular.module('starter.controllers')

    .controller('ListCtrl', function($scope, $http, listService) {

      $scope.$on('$ionicView.enter', function(e) {
        listService.getLists().then(function(lists) {
          $scope.lists = lists;
        })
      });
    })

})();
