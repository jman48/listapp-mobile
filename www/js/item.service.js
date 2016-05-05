(function() {

  angular.module('listapp.services')
    .service('itemService', itemService);

  function itemService($http, host, $q) {
    var itemServ = {
      getItems: getItems,
      deleteItem: deleteItem
    };

    return itemServ;

    function getItems(listId) {
      return $http.get(host + '/lists/' + listId + '/items/').then(function(response) {
        return response.data;
      }, function(response) {
        $q.reject(response.data);
      });
    }

    function deleteItem(item) {
      return $http.delete(host + '/lists/' + item.list_id + '/items/' + item.id).then(function(response) {
        response.data;
      });
    }
  }
})();
