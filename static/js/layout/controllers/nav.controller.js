(function() {
  'use strict';

  angular
    .module('translator.layout.controllers')
    .controller('NavController', NavController);

  function NavController($scope) {
    $scope.routes = [
      { title: 'Translations', state: 'results'},
      { title: 'Translate', state: 'input'},
      { title: 'Login', state: 'login'},
      { title: 'Signup', state: 'signup'},
    ];
  }
})();
