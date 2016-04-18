(function() {
  angular.module('starter.controllers')

    .controller('ListCtrl', function($scope, $http, host) {

      $scope.$on('$ionicView.enter', function(e) {
        $http.get(host + '/lists').then(function(response) {
          $scope.lists = response.data;
        }, function(response) {
          console.log(response.data);
        });
      });
    })

})();
