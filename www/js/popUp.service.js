(function() {

  angular.module('listapp.services')
    .service('popUpService', popUpService);

  function popUpService($ionicPopup, $rootScope, listService) {
    var modalServ = {
      showListOptions: showListOptions,
      showNewList: showNewList
    }, hideCallBack;

    return modalServ;

    function showListOptions(list, callBack) {
      hideCallBack = callBack;

      var scope = $rootScope.$new(),
        popUp;

      scope.list = list;

      popUp = $ionicPopup.show({
        template: '<input type="text" ng-model="list.name">',
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
        template: '<input type="text" ng-model="list.name">',
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
  }
})();
