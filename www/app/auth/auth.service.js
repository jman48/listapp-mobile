(function() {

  angular.module('listapp.services')
    .service('authService', authService);

  function authService(auth, store, $state, $rootScope, userService, statService) {
    var authServ = {
      login: login,
      logOut: logOut,
      isAuthenticated: isAuthenticated
    };

    return authServ;

    function login() {
      statService.trackEvent('Auth', 'Login', 'Login');

      auth.signin({
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function(profile, token, accessToken, state, refreshToken) {
        // Success callback
        store.set('token', token);
        store.set('refreshToken', refreshToken);
        $rootScope.$broadcast('loggedIn');
        $state.go('app.lists');
        userService.getLoggedInUser();
      }, function() {
        // Error callback
      });
    }

    function logOut() {
      statService.trackEvent('Auth', 'Login', 'Logout');
      
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $rootScope.$broadcast('loggedOut');
      $state.go('login', {reload: true});
      userService.setCurrentUser({});
    }

    function isAuthenticated() {
      return auth.isAuthenticated;
    }
  }
})();
