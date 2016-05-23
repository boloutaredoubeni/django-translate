(function() {
  'use strict';

  angular
    .module('translator.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope',
                             '$location',
                             '$rootScope',
                             'authentication',
                             'AUTH_EVENTS',
                             'Session'];

  function LoginController($scope, $location, $rootScope, authentication, AUTH_EVENTS, Session) {
    $scope.user = {};
    $scope.login = function() {
      authentication
        .login($scope.user)
        .then(
          function(response) {
            console.dir(response);
             if (response.status !==  200 ) {
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
              Session.setUsername('');
              return;
            }
            if (response.data.token) {
              authentication.storeToken(response.data.token);
              Session.setAuthenticated(true);
            }
            Session.setUsername($scope.user.username);
            Session.setLoggedIn(true);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $location.path('/translate');
          },
          function(error) {
            Session.setUsername('');
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          }
        );
    };
  }
})();
