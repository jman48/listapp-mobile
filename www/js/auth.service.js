(function() {

  angular.module('listapp.services')
    .service('authService', authService);

  function authService(auth, store, $state) {
    var authServ = {
      login: login,
      logOut: logOut,
      isAuthenticated: isAuthenticated
    };

    return authServ;

    function login() {
      auth.signin({
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function(profile, token, accessToken, state, refreshToken) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        store.set('refreshToken', refreshToken);
        $state.go('app.lists');
      }, function() {
        // Error callback
      });
    }

    function logOut() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $state.go('login', {reload: true});
    }

    function isAuthenticated() {
      return auth.isAuthenticated;
    }
  }
})();
