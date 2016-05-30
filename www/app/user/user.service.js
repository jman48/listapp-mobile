(function() {

  angular.module('listapp.services')
    .service('userService', userService);

  function userService($http, host, $q) {

    var userServ = {
      search: search
    };

    return userServ;

    function search(search_string) {
      var search = {search: {username: search_string}};

      return $http.post(host + '/users/search', search).then(function(response) {
        return response.data;
      }, function(response) {
        $q.reject(response.data);
      });
    }
  }
})();
