(function() {

  angular.module('listapp.services')
    .service('popUpService', popUpService);

  function popUpService($ionicPopup, $rootScope, listService, itemService) {
    var modalServ = {
      showEditList: showEditList,
      showEditItem: showEditItem,
      showNewList: showNewList,
      showNewItem: showNewItem,
      showConfirm: showConfirm
    }, hideCallBack;

    return modalServ;

    function showEditList(list, callBack) {
      hideCallBack = callBack;

      var scope = $rootScope.$new(),
        popUp;

      scope.list = list;

      popUp = $ionicPopup.show({
        template: '<input type="text" ng-model="list.name" autofocus="true">',
        title: 'Enter list name',
        scope: scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function() {
              return listService.editList(list.name, list.id).then(function() {
                popUp.close();
                hideCallBack();
              });
            }
          }
        ]
      });

      return popUp;
    }

    function showEditItem(item, callBack) {
      hideCallBack = callBack;

      var scope = $rootScope.$new(),
        popUp;

      scope.item = item;

      popUp = $ionicPopup.show({
        template: '<input type="text" ng-model="item.name" autofocus="true">',
        title: 'Enter item name',
        scope: scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function() {
              return itemService.editItem(item).then(function() {
                popUp.close();
                hideCallBack();
              });
            }
          }
        ]
      });

      return popUp;
    }

    function showNewList(callBack) {
      hideCallBack = callBack;

      var scope = $rootScope.$new(),
        popUp;

      scope.list = {name: ''};

      popUp = $ionicPopup.show({
        template: '<input type="text" ng-model="list.name" autofocus="true">',
        title: 'Enter list name',
        scope: scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Create</b>',
            type: 'button-positive',
            onTap: function() {
              return listService.addList(scope.list.name).then(function() {
                popUp.close();
                hideCallBack();
              });
            }
          }
        ]
      });
    }

    function showNewItem(listId, callBack) {
      hideCallBack = callBack;

      var scope = $rootScope.$new(),
        popUp;

      scope.item = {name: ''};

      popUp = $ionicPopup.show({
        template: '<input type="text" ng-model="item.name" autofocus="true">',
        title: 'Enter item name',
        scope: scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Create</b>',
            type: 'button-positive',
            onTap: function() {
              return itemService.addItem(scope.item.name, listId).then(function() {
                popUp.close();
                hideCallBack();
              });
            }
          }
        ]
      });
    }

    function showConfirm(callBack, title, content) {
      var confirmPopup = $ionicPopup.confirm({
        title: title,
        template: content
      });

      confirmPopup.then(function(res) {
        if(res) {
          callBack()
        }
      });
    }
  }
})();
