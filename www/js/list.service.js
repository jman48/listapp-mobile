(function() {

  angular.module('listapp.services')
    .service('listService', listService);

  function listService($http, host, $q) {
    var lists = {};

    var listServ = {
      getLists: getLists,
      deleteList: deleteList,
      editList: editList,
      addList: addList,
      getList: getList
    };

    return listServ;

    function getLists() {
      return $http.get(host + '/lists').then(function(response) {
        //Cache lists
        response.data.forEach(function(list) {
          lists[list.id] = list.name;
        });

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

    function editList(listName, listId) {
      var list = {list: {name: listName}};

      return $http.put(host + '/lists/' + listId, list).then(function(response) {
        return response.data;
      });
    }

    function addList(listName) {
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
  }
})();
