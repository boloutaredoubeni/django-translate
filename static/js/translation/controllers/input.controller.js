(function() {
  'use strict';

  angular
    .module('translator.translation.controllers')
    .controller('InputController', InputController);

  InputController.$inject = ['$scope', 'translation'];

  function InputController($scope, translation) {
    $scope.sourceText = '';
    $scope.status = '';
    $scope.errorMessage = '';

    $scope.sendToServer = function() {
      // TODO: make sure its validated
      $scope.errorMessage = '';
      $scope.status = 'Submitting ...';
      translation
        .translate($scope.sourceText)
        .then(
          // success
          function(response) {
            if (!response.success) {
              $scope.errorMessage = response.data.detail;
              return;
            }
            $scope.sourceText = '';
            $scope.status = response;
          },
          // error
          function(error) {
            $scope.sourceText = '';
            $scope.errorMessage = error.data.detail;
            $scope.status = error;
          }
        );
    };
  }
})();
