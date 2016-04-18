(function() {

  angular.module('listapp.services')
    .service('itemService', itemService);

  function itemService($http, host, $q) {
    var itemServ = {
      getItems: getItems
    };

    return itemServ;

    function getItems(listId) {
      return $http.get(host + '/lists/' + listId + '/items/').then(function(response) {
        return response.data;
      }, function(response) {
        $q.reject(response.data);
      });
    }
  }
})();
