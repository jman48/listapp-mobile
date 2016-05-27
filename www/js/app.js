angular.module('listapp')

  .run(function($ionicPlatform, auth) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by, default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      auth.hookEvents();
    });
  })

  .config(function($httpProvider, authProvider) {

    authProvider.init({
      domain: 'john.au.auth0.com',
      clientID: 'l92hDtfOVGU8AlmYHmsaTPRicMyTEzDi',
      loginState: 'login'
    });

    $httpProvider.interceptors.push('authInterceptor');
  });
