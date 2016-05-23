(function() {
  'use strict';

  angular
    .module('translator.authentication.services')
    .service('Session', Session);

  Session.$inject = ['$rootScope'];

  function Session($rootScope) {
    var _username = '';
    var _authorized = false;
    var _loggedIn = false;

    this.getUsername = function() { return _username; }
    this.setUsername = function(name) {
      _username = name;
      console.error('username changed');
      $rootScope.$broadcast('user:updated', _username);
    }

    this.setAuthenticated = function(flag) { _authorized = flag; }
    this.setLoggedIn = function(flag) { _authorized = flag; }
  }
})();
