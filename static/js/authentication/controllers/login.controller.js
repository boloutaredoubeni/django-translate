(function() {
  'use strict';

  angular
    .module('translator.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'authentication'];

  function LoginController($scope, authentication) {
    var vm = this;
    vm.user = {};
    vm.errorMessage = '';
    vm.login = function() {
      authentication
        .login(vm.user)
        .then(
          function(response) {
            console.dir(response);
             vm.errorMessage = '';
             if (response.status !==  200 ) {
              vm.errorMessage = response.data;
              return;
            }
            if (response.config.url.indexOf('{{ api_url }}') === 0 && response.data.token) {
              console.log('Token found');
              authentication.storeToken(response.data.token);
             }
          },
          function(error) {
            console.dir(error);
            vm.errorMessage = error.data;
          }
        );
    };
  }
})();
