(function() {
  'use strict';

  angular
    .module('translator.translation.controllers')
    .controller('ResultsController', ResultsController);

  ResultsController.$inject = ['$scope', 'translation'];

  function ResultsController($scope, translation) {
    var vm = this;
    vm.queries = [];
    vm.errorMessage = '';
    vm.$on('$stateChangeSuccess', function() {
      translation
        .list()
        .then(
          function(response) {
            if (response.status !==  200 ) {
              vm.errorMessage = response.data.detail;
              return;
            }
            vm.queries = response.data;
          },
          function(error) {
            vm.errorMessage = error;
          }
        );
    });
  }
})();
