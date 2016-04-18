(function() {

  angular.module('starter.services', [])
    .service('listService', listService);

  function listService($http, host, $q) {
    var listServ = {
      getLists: getLists
    };

    return listServ;

    function getLists() {
      $http.get(host + '/lists').then(function(response) {
        return response.data;
      }, function(response) {
        $q.reject(response.data);
      });
    }
  }
})();
