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
    return {
      login: function(user) {
        return $http
          .post(API_ENDPOINT + '/login', user);
      },
      logout: function(username, password) {
        $window.localStorage.removeItem(JWT_TOKEN);
      },
      decode: function(token) {
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
      },
      storeToken: function(token) {
        $window.localStorage[JWT_TOKEN] = token;
      },
      getToken: function() {
        return $window.localStorage[JWT_TOKEN];
      },
      authenticated: function() {
        var token = self.getToken();
        if (token) {
          var params = self.decode(token);
          return Math.round(new Date().getTime() / 1000) <= params.exp;
        }
        return false;
      }
    };
  }
})();
