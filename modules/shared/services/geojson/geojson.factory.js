import getCenter from '../../../../src/shared/services/geo-json/geo-json'
;(function() {
  angular.module('dpShared').factory('geojson', geojsonFactory)

  function geojsonFactory() {
    return {
      getCenter,
    }
  }
})()
