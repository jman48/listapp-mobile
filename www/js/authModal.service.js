(function() {

  angular.module('starter.services', [])
    .service('loginModal', loginModal);

  function loginModal($ionicModal, $rootScope) {
    var modal,
      modalScope,
      loginModal = {
        show: show
      };

    return loginModal;

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: modalScope
    }).then(function(newModal) {
      modal = newModal;
    });

    function show() {
      modalScope = $rootScope.$new();

      // Form data for the login modal
      modalScope.loginData = {};

      // Triggered in the login modal to close it
      modalScope.closeLogin = function() {
        modal.hide();
      };

      // Perform the login action when the user submits the login form
      modalScope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          modalScope.closeLogin();
        }, 1000);
      };
    }

  }
})();
