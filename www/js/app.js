angular.module('listapp')

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/lists');

    $httpProvider.interceptors.push('authInterceptor');
  });
