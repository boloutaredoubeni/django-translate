// // FIXME: use $resource instead of $http for REST calls
// /* https://docs.angularjs.org/api/ngResource/service/$resource */
(function() {
  'use strict';

  angular
    .module('translator.services', ['ngCookies']);

  angular
    .module('translator', ['ui.router',
                           'ngMaterial',
                           'translator.authentication',
                           'translator.translation',
                           'ngCookies']);

  angular
    .module('translator')
    .constant('API_ENDPOINT', '/api/v1')
    .constant('JWT_TOKEN', 'jW10k3n')
    .config(config)
    .config(function($httpProvider) {
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    });

  function config($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.otherwise('/');

     $stateProvider
       .state('results', {
         url: '/translations',
         templateUrl: 'templates/results.html',
         controller: 'ResultsController as vm',
       })
       .state('input', {
         url: '/',
         templateUrl: 'templates/input.html',
         controller: 'InputController as vm',
       })
       // FIXME: if the user is logged in don't navigate to this state
       .state('login', {
         url: '/login',
         templateUrl: 'templates/login.html',
         controller: 'LoginController as vm',
       })
       .state('signup', {
         url: '/signup',
         templateUrl: 'templates/signup.html',
         controller: 'SignupController as vm',
       })
   }
})();
