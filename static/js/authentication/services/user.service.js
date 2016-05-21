(function() {
  'use strict';

  angular
    .module('translator.authentication.services')
    .factory('user', user);

  user.$inject = ['$http', 'API_ENDPOINT'];

  function user($http, API_ENDPOINT) {
    return {
      register: function(user) {
        return $http
          .post(API_ENDPOINT + '/users/', user);
        }
    };
  }
})();
