/**
 * Capture any 401 errors and redirect user to login page
 */
(function() {
  'use strict';

  angular.module('listapp.interceptors', [])
    .factory('authInterceptor', authInterceptor);

  function authInterceptor($q, $injector, $window) {

    return {
      request: function(config) {

        if($window.localStorage.getItem('token')) {
          config.headers.token = JSON.parse($window.localStorage.getItem('token'));
        }

        return config;
      },
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
