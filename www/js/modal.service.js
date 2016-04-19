(function() {

  angular.module('listapp.services')
    .service('modalService', modalService);

  function modalService($ionicActionSheet, listService) {
    var modalServ = {
      showListOptions: showListOptions
    }, hideActionSheet,
      hideCallBack;

    return modalServ;

    function showListOptions(listId, callBack) {
      hideCallBack = callBack;

      hideActionSheet = $ionicActionSheet.show({
        buttons: [],
        destructiveText: 'Delete',
        titleText: 'Modify your List',
        cancelText: 'Cancel',
        cancel: function() {
          hideActionSheet();
        },
        destructiveButtonClicked: function() {
          listService.deleteList(listId).then(function() {
            hideOptions();
          });
        },
        buttonClicked: function(index) {
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
