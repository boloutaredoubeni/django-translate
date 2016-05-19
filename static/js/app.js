'use strict';

angular

  .module('translatorApp', ['ui.router', 'ngMessages'])

  .constant('API_ENDPOINT', '/api/v1')

  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  })
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('results', {
        url: '/translations',
        templateUrl: 'templates/results.html',
        controller: 'ResultsController',
      })
      .state('input', {
        url: '/',
        templateUrl: 'templates/input.html',
        controller: 'InputController'
      })

  })

  .controller('InputController', ['$scope', 'TranslationService', function($scope, TranslationService) {

    $scope.sourceText = '';
    $scope.status = '';
    $scope.errorMessage = '';

    $scope.sendToServer = function() {
      // TODO: make sure its validated
      $scope.errorMessage = '';
      $scope.status = 'Submitting ...';
      TranslationService
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
  }])
  .controller('ResultsController', ['$scope', 'TranslationService', function($scope, TranslationService) {
    $scope.queries = [];
    $scope.errorMessage = '';
    $scope.$on('$stateChangeSuccess', function() {
      TranslationService
        .list()
        .then(
          function(response) {
            console.dir(response);
            if (response.status !==  200 ) {
              $scope.errorMessage = response.data.detail;
              return;
            }
            $scope.queries = response.data;
          },
          function(error) {
            $scope.errorMessage = error;
          }
        );
    });
  }])

  .factory('TranslationService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
    return {
      translate: function(source) {
        return $http
          .post(API_ENDPOINT + '/queries/', {
            lang: '',
            translation: '',
            source: source,
          });
      },
       // TODO: allow pagination
      list: function() {
        return $http.get(API_ENDPOINT + '/queries');
      }
    }
  }])

  .factory('AuthenticationService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
    return {
      login: function(username, password) {
        $http
          .post(API_ENDPOINT + '/authenticate', {
            username: username,
            password: password,
          })
          // TODO: complete
          .then(
            function(response) {
              console.dir(response);
            },
            function(error) {
              console.dir(error);
            }
          );
      },
      // TODO: add other service methods
    };
  }]);
