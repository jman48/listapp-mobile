(function() {
  angular.module('starter.controllers')

    .controller('ListCtrl', function($scope, $http, host) {
      $http.get(host + '/lists').then(function(response) {
        $scope.lists = response.data;
      }, function(response) {
        console.log(response.data);
      });
    })

})();
