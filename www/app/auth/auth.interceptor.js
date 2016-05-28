/**
 * Capture any 401 errors and redirect user to login page
 */
(function() {
  'use strict';

  angular.module('listapp.interceptors', [])
    .factory('authInterceptor', authInterceptor);

  function authInterceptor($q, $injector) {

    return {
      responseError: function(rejection) {
        var $state = $injector.get('$state');

        if (rejection.status === 401) {
          $state.go('login');
        }

        return $q.reject(rejection);
      }
    };
  }
})();
