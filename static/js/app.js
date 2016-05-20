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
      // FIXME: if the user is logged in don't navigate to this state
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })

  })

  .controller('LoginController', ['$scope', 'AuthenticationService', function($scope, AuthenticationService) {
    $scope.user = {};
    $scope.login = function() {
      AuthenticationService
        .login($scope.user.name, $scope.user.password)
        .then(
          function(response) {},
          function(error) {}
        );
    };
  }])
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

  .service('UserService', ['$http', function($http) {

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
  .factory('AuthenticationService', ['$http', function($http) {
    return {
      login: function(username, password) {
        return $http
          .post('/authorize/login', {
            username: username,
            password: password,
          });
      },
      register: function(username, password) {
        return $http
          .post('/authorize/register', {
            username: username,
            password: password,
          });
      },
      logout: function(username, password) {
        return $http
          .post('authorize/logout', {
          });
      }
    };
  }]);
