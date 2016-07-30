(function() {

  angular.module('listapp.services')
    .service('listService', listService);

  function listService($http, host, $q, statService) {
    var lists = {};

    var listServ = {
      getLists: getLists,
      deleteList: deleteList,
      editList: editList,
      addList: addList,
      getList: getList,
      saveOrder: saveOrder
    };

    return listServ;

    function getLists() {
      return $http.get(host + '/lists').then(function(response) {
        //Cache lists
        response.data.forEach(function(list) {
          lists[list.id] = list;
        });

        response.data.sort(function(a, b) {
          return a.order - b.order;
        });

        return response.data;
      }, function(response) {
        $q.reject(response.data);
      });
    }

    function deleteList(listId) {
      statService.trackEvent('List', 'Management', 'Delete');

      return $http.delete(host + '/lists/' + listId).then(function(response) {
        return response.data;
      });
    }

    function editList(listName, listId) {
      statService.trackEvent('List', 'Management', 'Edit');

      var list = {list: {name: listName}};

      return $http.put(host + '/lists/' + listId, list).then(function(response) {
        return response.data;
      });
    }

    function addList(listName) {
      statService.trackEvent('List', 'Management', 'Add');

      var list = {list: {name: listName}};

      return $http.post(host + '/lists', list).then(function(response) {
        return response.data;
      });
    }

    function getList(id) {
      if (lists[id]) {
        return lists[id];
      }

      return $http.post(host + '/lists' + id).then(function(response) {
        return response.data;
      });
    }

    function saveOrder(lists) {
      statService.trackEvent('List', 'Management', 'Order');

      var lists = {lists: lists};

      return $http.put(host + '/lists/order', lists).then(function(response) {
        return response.data;
      });
    }
  }
})();
