(function() {

  angular.module('starter.services', [])
    .service('authService', authService);

  function authService($http, $window, host, $q) {
    var authServ = {
      login: login
    };

    return authServ;

    function login(username, password) {
      var user = {user: {username: username, password: password}};

      return $http.post(host + '/users/login', user).then(function(response) {
        $window.localStorage.setItem('token', JSON.stringify(response.data.token));
      }, function(response) {
        return $q.reject(response.data);
      })
    }
  }
})();
