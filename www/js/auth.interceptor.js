/**
 * Capture any 401 errors and redirect user to login page
 */
(function() {
  'use strict';

  angular.module('listappFe')
    .factory('authInterceptor', authInterceptor);

  function authInterceptor($q, $injector) {

    return {
      responseError: function(rejection) {
        var authService = $injector.get('auth');

        if (rejection.status === 401) {
          authService.redirectToLogin();
        }

        return $q.reject(rejection);
      }
    };
  }
})();
