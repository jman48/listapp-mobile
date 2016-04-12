(function() {

  angular.module('starter.services', [])
    .service('authService', authService);

  function authService($http, $window, host) {
    var authServ = {
      login: login
    };

    return authServ;

    function login(username, password) {
      var user = {user: {username: username, password: password}};

      $http.post(host + '/users/login', user).then(function(response) {
        $window.localStorage.setItem('token', JSON.stringify(response.token));
      }, function(response) {
        return $q.reject(response.data);
      })
    }
  }
})();
