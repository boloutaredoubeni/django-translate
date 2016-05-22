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
        var headers = {};
        var token = authentication.getToken();
        if (token) {
          console.log('Token found');
          headers.Authorization = $http.defaults.headers.common['Authorization'] + ' Token ' + token;
        }

        return $http
        // todo: authenticate via interceptr request
          .post(API_ENDPOINT + '/queries/', {
            headers: headers,
            data: {
              source: source,
            }
          });
      },
       // TODO: allow pagination
      list: function() {
        return $http.get(API_ENDPOINT + '/queries');
      }
    }
  }
})();
