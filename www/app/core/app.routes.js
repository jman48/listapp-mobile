(function() {
  angular.module('listapp').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/menu/menu.html',
        controller: 'menuCtrl'
      })
      .state('app.lists', {
        url: '/lists',
        views: {
          'menuContent': {
            templateUrl: 'app/list/lists.html',
            controller: 'ListCtrl'
          }
        }
      })
      .state('app.items', {
        url: '/lists/:listId',
        views: {
          'menuContent': {
            templateUrl: 'app/item/items.html',
            controller: 'ItemsCtrl'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login-page.html',
        controller: 'LoginCtrl'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('app/lists');
  })
})();
