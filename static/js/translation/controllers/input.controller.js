(function() {
  'use strict';

  angular
    .module('translator.translation.controllers')
    .controller('InputController', InputController);

  InputController.$inject = ['$scope', '$location', 'translation'];

  function InputController($scope, $location, translation) {
    $scope.sourceText = '';
    $scope.status = '';
    $scope.errorMessage = '';

    $scope.sendToServer = function() {
      // TODO: make sure its validated
      translation
        .translate($scope.sourceText)
        .then(
          // success
          function(response) {
            if (!response.success) {
              return;
            }
            $scope.sourceText = '';
            $location.path('/').replace();
            $scope.apply();
          },
          // error
          function(error) {
            console.dir(error);
            $scope.sourceText = '';
          }
        );
    };
  }
})();
