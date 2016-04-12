/**
 * Capture any 401 errors and redirect user to login page
 */
(function() {
  'use strict';

  angular.module('starter.interceptors', [])
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
        var loginModal = $injector.get('loginModal');

        if (rejection.status === 401) {
          loginModal.show();
        }

        return $q.reject(rejection);
      }
    };
  }
})();
