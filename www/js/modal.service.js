(function() {

  angular.module('listapp.services')
    .service('modalService', modalService);

  function modalService($ionicActionSheet, listService) {
    var modalServ = {
      showListOptions: showListOptions
    }, hideOptions;

    return modalServ;

    function showListOptions(listId) {
      hideOptions = $ionicActionSheet.show({
        buttons: [],
        destructiveText: 'Delete',
        titleText: 'Modify your List',
        cancelText: 'Cancel',
        cancel: function() {
          hideOptions();
        },
        destructiveButtonClicked: function () {

        },
        buttonClicked: function(index) {
          return true;
        }
      });
    }
  }
})();
