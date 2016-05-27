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

  .config(function($httpProvider, authProvider, jwtInterceptorProvider) {

    authProvider.init({
      domain: 'john.au.auth0.com',
      clientID: 'l92hDtfOVGU8AlmYHmsaTPRicMyTEzDi',
      loginState: 'login'
    });

    jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
      var idToken = store.get('token');
      var refreshToken = store.get('refreshToken');
      
      // If no token return null
      if (!idToken || !refreshToken) {
        return null;
      }

      // If token is expired, get a new one
      if (jwtHelper.isTokenExpired(idToken)) {
        return auth.refreshIdToken(refreshToken).then(function(idToken) {
          store.set('token', idToken);
          return idToken;
        });
      } else {
        return idToken;
      }
    };

    $httpProvider.interceptors.push('jwtInterceptor');

    $httpProvider.interceptors.push('authInterceptor');
  });
