(function() {

  angular.module('listapp.services')
    .service('popUpService', popUpService);

  function popUpService($ionicPopup, $rootScope, listService, itemService) {
    var modalServ = {
      showEditList: showEditList,
      showNewList: showNewList,
      showNewItem: showNewItem
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
  }
})();
