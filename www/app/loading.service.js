(function() {

  angular.module('listapp.services')
    .service('loading', loadingService);

  function loadingService($ionicLoading) {
    var loadingServ = {
      show: show,
      hide: hide
    };

    return loadingServ;

    function show() {
      $ionicLoading.show({
        template: 'Loading...'
      });
    }

    function hide() {
      $ionicLoading.hide();
    }
  }
})();
