(function() {

  angular.module('listapp.services')
    .service('userService', userService);

  function userService($http, host, $q) {

    var userServ = {
      search: search,
      addUsers: addUsers
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

    function addUsers(list, users) {
      var addToList = {users: users};

      return $http.post(host + '/list/' + list.id + '/users', addToList).then(function(response) {
        return response.data;
      });
    }
  }
})();
