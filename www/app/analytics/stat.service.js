(function() {

  angular.module('listapp.services')
    .service('statService', statService);

  function statService($window) {

    var statServ = {
      startGathering: startGathering,
      trackView: trackView,
      trackEvent: trackEvent
    };

    return statServ;

    function startGathering() {
      $window.ga.startTrackerWithId('UA-81204352-3');
    }

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
