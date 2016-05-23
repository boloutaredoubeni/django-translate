(function() {
  'use strict';

  angular
    .module('translator.translation.controllers')
    .controller('InputController', InputController);

  InputController.$inject = ['$scope', '$location', 'translation'];

  function InputController($scope, translation) {
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
            $location.path('/')
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
