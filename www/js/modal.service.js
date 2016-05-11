(function() {

  angular.module('listapp.services')
    .service('modalService', modalService);

  function modalService($ionicActionSheet, listService, itemService, popUpService, $state) {
    var modalServ = {
        showListOptions: showListOptions,
        showItemOptions: showItemOptions
      }, hideActionSheet,
      hideCallBack;

    return modalServ;

    function showListOptions(list, callBack) {
      hideCallBack = callBack;

      hideActionSheet = $ionicActionSheet.show({
        buttons: [],
        destructiveText: 'Delete',
        titleText: 'Modify your List',
        cancelText: 'Cancel',
        buttons: [
          {text: 'Show'},
          {text: 'Edit'}
        ],
        cancel: function() {
          hideActionSheet();
        },
        destructiveButtonClicked: function() {
          listService.deleteList(list.id).then(function() {
            hideOptions();
          });
        },
        buttonClicked: function(index) {
          if (index === 0) {
            $state.go('app.items', {listId: list.id})
          } else if (index == 1) {
            popUpService.showEditList(list, hideCallBack).then(hideActionSheet);
          }
          return true;
        }
      });
    }

    function showItemOptions(item, callBack) {
      hideCallBack = callBack;

      hideActionSheet = $ionicActionSheet.show({
        buttons: [],
        destructiveText: 'Delete',
        titleText: 'Modify your Item',
        cancelText: 'Cancel',
        buttons: [
          {text: 'Edit'}
        ],
        cancel: function() {
          hideActionSheet();
        },
        destructiveButtonClicked: function() {
          itemService.deleteItem(item).then(function() {
            hideOptions();
          });
        },
        buttonClicked: function(index) {
          popUpService.showEditItem(item, callBack);
          return true;
        }
      });
    }

    function hideOptions() {
      hideActionSheet();
      hideCallBack();
    }
  }
})();
