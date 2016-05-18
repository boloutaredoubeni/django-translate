angular

  .module('translatorApp', ['ngRoute'])

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
  }]);
