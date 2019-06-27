import SHARED_CONFIG from '../../src/shared/services/shared-config/shared-config'
;(function() {
  angular.module('dpShared').factory('sharedConfig', sharedConfigFactory)

  sharedConfigFactory.$inject = ['environment']

  function sharedConfigFactory(environment) {
    return SHARED_CONFIG
  }
})()
