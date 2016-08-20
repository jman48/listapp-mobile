(function() {

  angular.module('listapp.services')
    .service('modalService', modalService);

  function modalService($ionicActionSheet, listService, itemService, popUpService, $state, userModalService) {
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
          {text: 'Edit'},
          {text: 'Users'}
        ],
        cancel: function() {
          hideActionSheet();
        },
        destructiveButtonClicked: function() {

          popUpService.showConfirm(function() {
            listService.deleteList(list.id).then(function () {
              hideOptions();
            });
          }, 'Delete list', 'Are you sure you want to delete this list?');
        },
        buttonClicked: function(index) {
          if (index === 0) {
            $state.go('app.items', {listId: list.id})
          } else if (index == 1) {
            popUpService.showEditList(list, hideCallBack).then(hideActionSheet);
          } else if (index == 2) {
            //Show users of list
            userModalService.viewUsersModal(list);
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

          popUpService.showConfirm(function() {
            itemService.deleteItem(item).then(function () {
              hideOptions();
            });
          }, 'Delete Item', 'Are you sure you want to delete this item?');
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
