(function() {
  'use strict';

  angular
    .module('translator.translation.controllers')
    .controller('InputController', InputController);

  InputController.$inject = ['$scope', 'translation'];

  function InputController($scope, translation) {
    var vm = this;

    vm.sourceText = '';
    vm.status = '';
    vm.errorMessage = '';

    vm.sendToServer = function() {
      // TODO: make sure its validated
      vm.errorMessage = '';
      vm.status = 'Submitting ...';
      translation
        .translate(vm.sourceText)
        .then(
          // success
          function(response) {
            if (!response.success) {
              vm.errorMessage = response.data.detail;
              return;
            }
            vm.sourceText = '';
            vm.status = response;
          },
          // error
          function(error) {
            vm.sourceText = '';
            vm.errorMessage = error.data.detail;
            vm.status = error;
          }
        );
    };
  }
})();
