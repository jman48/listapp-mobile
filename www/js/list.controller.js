(function() {
  angular.module('starter.controllers')

    .controller('ListCtrl', function($scope, $http, host) {
      $scope.lists = [
        { title: 'Shopping list', id: 1 },
        { title: 'Todo', id: 2 },
        { title: 'Tech', id: 3 },
        { title: 'Music to try', id: 4 }
      ];
    })

})();
