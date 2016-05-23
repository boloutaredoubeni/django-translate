(function() {
  'use strict';

  angular
    .module('translator.layout.controllers')
    .controller('NavController', NavController);

  NavController.$inject = ['$scope', 'Session'];

  function NavController($scope, Session) {
    $scope.username = Session.getUsername();
    $scope.authorized = false;

    $scope.routes = [
      { title: 'Translations', state: 'results'},
      { title: 'Translate', state: 'input'},
      { title: 'Login', state: 'login'},
      { title: 'Signup', state: 'signup'},
    ];

    $scope.$on('user:updated', function(event, data) {
     $scope.username = data || '';
   });
  }
})();
