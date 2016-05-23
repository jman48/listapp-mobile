(function() {
  'use strict';

  angular.module('listapp.controllers', []);
  angular.module('listapp.services', []);
  angular.module('listapp.interceptors', []);
  angular.module('listapp.constants', []);
  angular.module('listapp.directives', []);
  angular.module('listapp', ['ionic', 'ui.router', 'listapp.controllers', 'listapp.constants', 'listapp.interceptors', 'listapp.services', 'listapp.directives', 'as.sortable']);
})();
