angular

  .module('translatorApp', ['ngRoute'])

  .constant('API_ENDPOINT', '/api/v1')

  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  })
  .config(function($routeProvider){

    $routeProvider
      .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MainController',
      })
      .when('/submit', {
        templateUrl: 'templates/main.html',
        controller: 'InputController'
      })
      .when('/results', {
        templateUrl: 'templates/main.html',
        controller: 'ResultsController'
      })
      .otherwise({
        redirectTo: '/'
      })

  })

  .controller('MainController', ['$scope', function($scope) {
    $scope.message = 'Hello From Main';
  }])
  .controller('InputController', ['$scope', function($scope) {
    $scope.message = 'Hello From Input';
  }])
  .controller('ResultsController', ['$scope', function($scope) {
    $scope.message = 'Hello From Results';
  }])

  .factory('TranslationService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
    return {
      translate: function(source, id) {
        $http
          .post(API_ENDPOINT + '/queries/', {
            id: id,
            source: source,
          })
          // TODO: complete
          .then(
            function(response) {
              // TODO: update ui
              console.dir(response);
            },
            function(error) {
              console.dir(error);
            }
          );
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
