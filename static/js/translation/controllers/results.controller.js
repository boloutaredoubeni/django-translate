(function() {
  'use strict';

  angular
    .module('translator.translation.controllers')
    .controller('ResultsController', ResultsController);

  ResultsController.$inject = ['$scope', 'translation'];

  function ResultsController($scope, translation) {
    $scope.queries = [];
    $scope.$on('$stateChangeSuccess', function() {
      translation
        .list()
        .then(
          function(response) {
            if (response.status !==  200 ) {
              return;
            }
            $scope.queries = response.data;
          },
          function(error) {
          }
        );
    });
  }
})();
