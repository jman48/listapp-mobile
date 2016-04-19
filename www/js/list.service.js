(function() {

  angular.module('listapp.services')
    .service('listService', listService);

  function listService($http, host, $q) {
    var listServ = {
      getLists: getLists,
      deleteList: deleteList
    };

    return listServ;

    function getLists() {
      return $http.get(host + '/lists').then(function(response) {
        return response.data;
      }, function(response) {
        $q.reject(response.data);
      });
    }

    function deleteList(listId) {
      return $http.delete(host + '/lists/' + listId).then(function(response) {
        return response.data;
      });
    }
  }
})();
