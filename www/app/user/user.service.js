(function () {

  angular.module('listapp.services')
    .service('userService', userService);

  function userService($http, host, $q) {
    var userCache = [],
      cachedSearchString;

    var userServ = {
      search: search,
      addUsers: addUsers
    };

    return userServ;

    function search(search_string) {

      //Get users from local cache if we are only refining the list of users.
      //e.g if we searched for "bob" then cache all results for bob so when we search for "bobb" we can get results from local cache
      if (search_string.indexOf(cachedSearchString) >= 0) {
        var users = [];

        for (var i = 0; i < userCache.length; i++) {
          if (userCache[i].username.indexOf(search_string) >= 0) {
            users.push(userCache[i]);
          }
        }

        return $q.resolve(users);
      }

      //If search string is not in cache then get results from server
      cachedSearchString = search_string;

      return $http.post(host + '/users/search', {search: {username: search_string}}).then(function (response) {
        userCache = response.data;
        return response.data;
      }, function (response) {
        $q.reject(response.data);
      });
    }

    function addUsers(list, users) {
      var addToList = {users: users};

      return $http.post(host + '/lists/' + list.id + '/users', addToList).then(function (response) {
        return response.data;
      });
    }
  }
})();
