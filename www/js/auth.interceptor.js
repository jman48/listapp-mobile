/**
 * Capture any 401 errors and redirect user to login page
 */
(function() {
  'use strict';

  angular.module('starter.interceptors', [])
    .factory('authInterceptor', authInterceptor);

  function authInterceptor($q, $injector) {

    return {
      responseError: function(rejection) {
        var loginModal = $injector.get('loginModal');

        if (rejection.status === 401) {
          loginModal.show();
        }

        return $q.reject(rejection);
      }
    };
  }
})();
