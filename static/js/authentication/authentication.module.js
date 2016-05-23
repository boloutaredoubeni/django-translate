(function() {
  'use strict';

  angular
    .module('translator.authentication', [
                            'translator.authentication.controllers',
                            'translator.authentication.services']);

  angular
    .module('translator.authentication.services', []);

  angular
    .module('translator.authentication.controllers', []);

  angular
    .module('translator.authentication')
    .constant('AUTH_EVENTS', {
      loginSuccess: 'loginSuccess',
      loginFailed: 'loginFailed',
      tokenExpired: 'tokenExpired',
    });
})();
