(function () {

  angular.module('listapp.services')
    .service('userModalService', modalService);

  function modalService($ionicModal) {
    var workingList,
      modal;

    var modalServ = {
      addUserModal: addUserModal,
      getLoadedList: getLoadedList,
      getLoadedModal: getLoadedModal
    };

    return modalServ;

    function addUserModal(list) {
      workingList = list;

      $ionicModal.fromTemplateUrl('app/templates/addUser.html', {
        animation: 'slide-in-up'
      }).then(function (initModal) {
        modal = initModal;
        modal.show();
      });
    }

    function getLoadedList() {
      return workingList;
    }

    function getLoadedModal() {
      return modal;
    }
  }
})();
