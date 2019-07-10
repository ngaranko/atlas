;(function() {
  angular.module('atlas').config($compileProvider => {
    $compileProvider.commentDirectivesEnabled(false)
    $compileProvider.cssClassDirectivesEnabled(false)
    $compileProvider.debugInfoEnabled(false)
  })
})()
