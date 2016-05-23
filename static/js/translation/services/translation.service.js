(function() {
  'use strict';

  angular
    .module('translator.translation.services')
    .factory('translation', translation);

  translation.$inject = ['$http', 'API_ENDPOINT', 'authentication'];

  function translation($http, API_ENDPOINT, authentication) {
    return {
      translate: function(source) {
        // Todo: try if authenticated else redirect
        var config = {
          headers: {},
        };
        var token = authentication.getToken();
        if (token) {
          console.log('Token found');
          config.headers.Authorization = 'Bearer ' + token;
        }


        return $http
          .post(API_ENDPOINT + '/queries/',
             { source: source },
                config);
      },
      list: function() {
        return $http.get(API_ENDPOINT + '/queries');
      }
    }
  }
})();
