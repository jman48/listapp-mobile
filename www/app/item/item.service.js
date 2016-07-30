(function() {

  angular.module('listapp.services')
    .service('itemService', itemService);

  function itemService($http, host, $q, statService) {
    var itemServ = {
      getItems: getItems,
      deleteItem: deleteItem,
      addItem: addItem,
      editItem: editItem,
      saveOrder: saveOrder
    };

    return itemServ;

    function getItems(listId) {
      return $http.get(host + '/lists/' + listId + '/items/').then(function(response) {
        response.data.sort(function(a, b) {
          return a.order - b.order;
        });

        return response.data;
      }, function(response) {
        $q.reject(response.data);
      });
    }

    function deleteItem(item) {
      statService.trackEvent('Item', 'Management', 'Delete');

      return $http.delete(host + '/lists/' + item.list_id + '/items/' + item.id).then(function(response) {
        response.data;
      });
    }

    function addItem(itemName, listId) {
      statService.trackEvent('Item', 'Management', 'Add');

      var newItem = {item: {name: itemName}};

      return $http.post(host + '/lists/' + listId + '/items/', newItem).then(function(response) {
        return response.data;
      });
    }

    function editItem(item) {
      statService.trackEvent('Item', 'Management', 'Edit');

      var newitem = {item: {name: item.name}};

      return $http.put(host + '/lists/' + item.list_id + '/items/' + item.id, newitem).then(function(response) {
        return response.data;
      });
    }

    function saveOrder(list, items) {
      statService.trackEvent('Item', 'Management', 'Order');

      var serverItems = {items: items};

      return $http.put(host + '/lists/' + list.id + '/items/order', serverItems).then(function(response) {
        return response.data;
      });
    }
  }
})();
