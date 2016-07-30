(function () {

  angular.module('listapp.services')
    .service('userService', userService);

  function userService($http, host, $q, statService) {
    var userCache = [],
      cachedSearchString,
      user;

    var userServ = {
      search: search,
      addUsers: addUsers,
      getListUsers: getListUsers,
      removeListUser: removeListUser,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
      getLoggedInUser: getLoggedInUser
    };

    return userServ;

    function search(search_string) {

      if (search_string === '' || !search_string) {
        return $q.resolve([]);
      }

      search_string = search_string.toLowerCase();


      //Get users from local cache if we are only refining the list of users.
      //e.g if we searched for "bob" then cache all results for bob so when we search for "bobb" we can get results from local cache
      if (search_string.indexOf(cachedSearchString) >= 0) {
        var users = [];

        for (var i = 0; i < userCache.length; i++) {
          if (userCache[i].username.indexOf(search_string) >= 0) {
            users.push(userCache[i]);
          }
        }

        statService.trackEvent('Users', 'Search Local', search_string, users.length);
        
        return $q.resolve(users);
      } else if (search_string.length < 3) {
        return $q.resolve([]);
      }

      statService.trackEvent('Users', 'Search Remote', search_string);
      
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
      statService.trackEvent('Users', 'Management', 'Add', users.length);

      var addToList = {users: users};

      return $http.post(host + '/lists/' + list.id + '/users', addToList).then(function (response) {
        return response.data;
      });
    }

    function getListUsers(list) {

      return $http.get(host + '/lists/' + list.id + '/users').then(function (response) {
        return response.data;
      }, function (response) {
        $q.reject(response.data);
      });
    }

    function removeListUser(userId, list) {
      statService.trackEvent('Users', 'Management', 'Remove');

      return $http.delete(host + '/lists/' + list.id + '/users/' + userId).then(function (response) {
        return response.data;
      }, function (response) {
        $q.reject(response.data);
      });
    }

    function setCurrentUser(currentUser) {
      user = currentUser;
    }

    function getCurrentUser() {
      if (user) {
        $q.resolve(user);
      } else {
        return getLoggedInUser();
      }
    }

    function getLoggedInUser() {
      return $http.get(host + '/users').then(function (response) {
        user = response.data;
        return user;
      }, function (response) {
        $q.reject(response.data);
      })
    }
  }
})();
