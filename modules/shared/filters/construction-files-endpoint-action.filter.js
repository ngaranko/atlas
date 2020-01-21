import { toConstructionFilesFromEndpoint } from '../../../src/store/redux-first-router/actions'
;(function() {
  'use strict'

  angular
    .module('dpShared')
    .filter('constructionFilesEndpointAction', constructionFilesEndpointAction)

  function constructionFilesEndpointAction() {
    return endpoint => {
      if (!endpoint) {
        return
      }
      return toConstructionFilesFromEndpoint(endpoint)
    }
  }
})()
