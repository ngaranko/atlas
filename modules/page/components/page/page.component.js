import { updateScroll } from 'redux-first-router'
import getContents from '../../../../src/shared/services/google-sheet/google-sheet'
;(function() {
  angular.module('dpPage').component('dpPage', {
    bindings: {
      name: '@',
      type: '@',
      item: '@',
    },
    templateUrl: 'modules/page/components/page/page.html',
    controller: DpPageComponent,
    controllerAs: 'vm',
  })

  DpPageComponent.$inject = ['$scope']

  function DpPageComponent($scope) {
    const vm = this

    function fetchData() {
      if (vm.type) {
        getContents(vm.type).then(contents => {
          vm.feed = contents.feed
          vm.entries = contents.entries
          vm.entry = vm.entries.find(entry => entry.id === vm.item)
          $scope.$digest()
          updateScroll()
        })
      }
    }

    vm.$onInit = function() {
      vm.feed = null
      vm.entries = []
      vm.entry = null

      fetchData()
    }

    vm.$onChanges = fetchData
  }
})()
