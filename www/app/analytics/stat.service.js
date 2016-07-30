(function() {

  angular.module('listapp.services')
    .service('statService', statService);

  function statService($window) {

    var statServ = {
      trackView: trackView,
      trackEvent: trackEvent
    };

    return statServ;

    function trackView(viewName) {
      if (typeof $window.ga !== 'undefined') {
        $window.ga.trackView(viewName || 'No view set');
      }
    }

    function trackEvent(category, action, label, value) {
      if (typeof $window.ga !== 'undefined') {
        $window.ga.trackEvent(category, action, label, value);
      }
    }
  }
})();
