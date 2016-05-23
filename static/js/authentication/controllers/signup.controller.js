(function() {
  'use strict';

  angular
    .module('translator.authentication.controllers')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$scope', '$location', 'user', 'authentication', 'Session'];

  function SignupController($scope, $location, user, authentication, Session) {
    $scope.user = {};
    $scope.errors = {};
    $scope.register = function() {
      user
        .register($scope.user)
        .then(
          function(response) {
              if (response.data.token) {
                console.log('Token found');
                authentication.storeToken(response.data.token);
                Session.setUsername($scope.user.username);
               }
              $scope.errors = {};
              $location.path('/login');
            },
            function(error) {
              Session.setUsername('');
              $scope.errors = error.data;
            }
        );
    }
  }
})();
