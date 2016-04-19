(function() {

  angular.module('listapp.services')
    .service('modalService', modalService);

  function modalService($ionicActionSheet) {
    var modalServ = {
      showListOptions: showListOptions
    }, optionsDialog;

    return modalServ;

    function showListOptions() {
      optionsDialog = $ionicActionSheet.show({
        buttons: [],
        destructiveText: 'Delete',
        titleText: 'Modify your List',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          return true;
        }
      });
    }
  }
})();
