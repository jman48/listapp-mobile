(function() {

  angular.module('listapp.services')
    .service('loginModal', loginModal);

  function loginModal($ionicModal, $rootScope, authService, $state, loading) {
    var modal,
      modalScope,
      loginModal = {
        show: show
      };

    return loginModal;

    function show() {
      modalScope = $rootScope.$new();

      // Triggered in the login modal to close it
      modalScope.closeLogin = function() {
        modal.hide();
      };

      // Perform the login action when the user submits the login form
      modalScope.doLogin = function(username, password) {
        loading.show();
        modalScope.errors = null;

        authService.login(username, password).then(function() {
          modal.hide();
          loading.hide();
          $state.go('app.lists', $state.params, { reload: true });
        }, function (error) {
          modalScope.errors = error.message;
          loading.hide();
        });
      };

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: modalScope
      }).then(function(newModal) {
        modal = newModal;
        modal.show();
      });
    }
  }
})();
