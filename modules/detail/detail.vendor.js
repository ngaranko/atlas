/* globals BBGA */
import * as d3 from 'd3'
;(function() {
  angular.module('dpDetail').config(configuration)

  configuration.$inject = ['$provide']

  function configuration($provide) {
    $provide.constant('BBGA', BBGA)
    $provide.constant('d3', d3)
  }
})()
