(function() {

  angular.module('listapp.services')
    .service('modalService', modalService);

  function modalService($ionicActionSheet, listService, popUpService) {
    var modalServ = {
      showListOptions: showListOptions
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
          { text: 'Edit' }
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
            popUpService.showListOptions(list, hideCallBack).then(hideActionSheet);
          }
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
