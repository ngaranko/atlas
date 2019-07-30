import { getEnvironment, ENVIRONMENTS } from '../../../../src/shared/environment'
;(function() {
  angular.module('dpShared').factory('environment', environmentFactory)

  environmentFactory.$inject = ['$location']

  function environmentFactory($location) {
    const config = {
      NAME: getEnvironment($location.host()),
    }
    config.isDevelopment = () => config.NAME === ENVIRONMENTS.DEVELOPMENT
    return config
  }
})()
