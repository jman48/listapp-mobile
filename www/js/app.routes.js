(function() {
  angular.module('listapp').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.lists', {
        url: '/lists',
        views: {
          'menuContent': {
            templateUrl: 'templates/lists.html',
            controller: 'ListCtrl'
          }
        }
      })
      .state('app.items', {
        url: '/lists/:listId',
        views: {
          'menuContent': {
            templateUrl: 'templates/items.html',
            controller: 'ItemsCtrl'
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login-page.html',
            controller: 'LoginCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/lists');
  })
})();
