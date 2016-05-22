(function() {
  'use strict';

  angular
    .module('translator.authentication.services')
    .factory('authentication', authentication);

  authentication.$inject = ['$http',
                            '$window',
                            '$cookies',
                            'JWT_TOKEN',
                            'API_ENDPOINT'];

  function authentication($http, $window, $cookies, JWT_TOKEN, API_ENDPOINT) {

    var service = {
      login: login,
      logout: logout,
      decode: decode,
      storeToken: storeToken,
      getToken: getToken,
      isAuthenticated: isAuthenticated,
    };

    function login(user) {
      return $http.post(API_ENDPOINT + '/login/', user);
    }

    function logout(username, password) {
      $window.localStorage.removeItem(JWT_TOKEN);
    }

    function decode(token) {
      var parts = token.split('.');
      var header = parts[0];
      var payload = parts[1];
      var signature = parts[2];

      var payload64 = payload.replace('-', '+').replace('_', '/');
      var info = {};
      try {
         info =  JSON.parse($window.atob(payload64));
      } catch(e) {
        info = e;
        console.log(e);
      } finally {
        return info;
      }
    }

    function storeToken(token) {
      $window.localStorage[JWT_TOKEN] = token;
    }

    function getToken() {
      return $window.localStorage[JWT_TOKEN];
    }

    function isAuthenticated() {
      var token = self.getToken();
      if (token) {
        var params = self.decode(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      }
      return false;
    }


    return service;
  }
})();
