(function() {
  'use strict';

  angular
    .module('translator.authentication.controllers')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$scope', 'user'];

  function SignupController($scope, user) {
    $scope.user = {};
    $scope.register = function() {
      user
        .register($scope.user)
        .then(
          function(response) {
            console.dir(response);
              if (response.status !==  200 ) {
                $scope.errorMessage = response.data.detail;
                return;
              }
              if (response.config.url.indexOf('{{ api_url }}') === 0 && response.data.token) {
                console.log('Token found');
                AuthenticationService.storeToken(response.data.token);
               }
              $scope.queries = response.data;
            },
            function(error) {
              console.dir(error);
              $scope.errorMessage = error;
            }
        );
    }
  }
})();
