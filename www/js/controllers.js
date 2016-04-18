angular.module('listapp.controllers')

  .controller('AppCtrl', function($scope, loginModal) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.showLogin = loginModal.show;
  })

  .controller('ItemsCtrl', function($scope, $stateParams, $http, host) {
    var listId = $stateParams.listId;
    $scope.items = [];

    $scope.$on('$ionicView.enter', function(e) {
      $http.get(host + '/lists/' + listId + '/items/').then(function(response) {
        $scope.items = response.data;
      })
    });
  });
