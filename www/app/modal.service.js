(function() {

  angular.module('listapp.services')
    .service('modalService', modalService);

  function modalService($ionicActionSheet, listService, itemService, popUpService, $state, $ionicModal, userService, $rootScope) {
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
          {text: 'Share'}
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
          } else if (index == 2) {
            //Add user to list.
            addUserModal(list)
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

    function addUserModal(list) {
      var modal,
        modalScope = $rootScope.$new();
      modalScope.list = list;
      modalScope.users = [];
      
      modalScope.update = function(searchString) {
        if (searchString.length > 2) {
          userService.search(searchString).then(function(usernames) {
            modalScope.usernames = usernames;
          })
        }
      };

      modalScope.toggleUser = function (username) {
        var userIdx = modalScope.users.indexOf(username);

        if (userIdx >= 0) {
          modalScope.users.splice(userIdx, 1);
        } else {
          modalScope.users.push(username);
        }
      };
      
      modalScope.addUsers = function() {
        userService.addUsers(list, modalScope.users);
      };

      $ionicModal.fromTemplateUrl('app/templates/addUser.html', {
        scope: modalScope,
        animation: 'slide-in-up'
      }).then(function(initModal) {
        modal = initModal;
        modal.show();
      });
    }

    function hideOptions() {
      hideActionSheet();
      hideCallBack();
    }
  }
})();
