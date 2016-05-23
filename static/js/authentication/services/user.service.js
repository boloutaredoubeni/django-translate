(function() {
  'use strict';

  angular
    .module('translator.authentication.services')
    .factory('user', user);

  user.$inject = ['$http', 'API_ENDPOINT', 'authenticaion'];

  function user($http, API_ENDPOINT, authenticaion) {
    var url = API_ENDPOINT + '/users/';

    var service = {
      register: register,
      delete: deleteUser,
      update: update,
      authenticated: authenticated,
    };

    function register(user) {
      return $http.post(url, user);
    }

    function deleteUser() {
      if (self.authenticated()) {
        // TODO: allow account deletion
        // TODO: make sure delegators call this method i.e. view -> ctrl -> delete -> logout
        console.error('Implement');
        return $http.delete(url, user);
      }
    }

    function update(user) {
      return $http.put(url, user);
    }

    function authenticated() {
      return authentication.isAuthenticated();
    }

    return service;
  }
})();

