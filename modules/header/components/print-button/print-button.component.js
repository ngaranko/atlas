;(function() {
  angular.module('dpHeader').component('dpPrintButton', {
    transclude: true,
    templateUrl: 'modules/header/components/print-button/print-button.html',
    controller: DpPrintButtonController,
    controllerAs: 'vm',
  })

  DpPrintButtonController.$inject = ['$window']

  function DpPrintButtonController($window) {
    const vm = this

    vm.print = function() {
      $window.print()
    }
  }
})()
