(function() {
  angular.module('listapp.controllers')
    .controller('LoginCtrl', function($scope, authService, $state, auth, store) {

      $scope.login = function() {
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

    });
})();
