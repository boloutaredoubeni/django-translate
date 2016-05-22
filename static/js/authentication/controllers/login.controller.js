(function() {
  'use strict';

  angular
    .module('translator.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$location', 'authentication'];

  function LoginController($scope, $location, authentication) {
    $scope.user = {};
    $scope.login = function() {
      authentication
        .login($scope.user)
        .then(
          function(response) {
            console.dir(response);
             $scope.errorMessage = '';
             if (response.status !==  200 ) {
              $scope.errorMessage = response.data;
              return;
            }
            if (response.config.url.indexOf('/api/v1/login') === 0 && response.data.token) {
              authentication.storeToken(response.data.token);
             }
          },
          function(error) {
            $scope.errorMessage = error.data;
          }
        );
    };
    $scope.errorMessage = '';

  }
})();
