;(function() {
  angular.module('dpPage').component('dpMetadata', {
    templateUrl: 'modules/page/components/metadata/metadata.html',
    controller: DpMetadataController,
    controllerAs: 'vm',
  })

  DpMetadataController.$inject = ['api']

  function DpMetadataController(api) {
    const vm = this

    vm.isLoading = true

    api
      .getByUri('metadata/')
      .then(function(data) {
        vm.sources = data
      })
      .finally(() => {
        vm.isLoading = false
      })
  }
})()
