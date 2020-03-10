import removeMd from 'remove-markdown'
import { downloadDatasetResource } from '../../../../src/shared/ducks/detail/actions'
;(function() {
  angular.module('dpDetail').component('dpDetail', {
    bindings: {
      endpoint: '@',
      previewPanorama: '<',
      isPreviewPanoramaLoading: '<',
      isLoading: '=',
      catalogFilters: '=',
      user: '<',
      detailTemplateUrl: '<',
      detailData: '<',
      detailFilterSelection: '<',
      subType: '<',
      id: '<',
    },
    templateUrl: 'modules/detail/components/detail/detail.html',
    controller: DpDetailController,
    controllerAs: 'vm',
  })

  DpDetailController.$inject = ['store', 'api']

  function DpDetailController(store, api) {
    const vm = this

    vm.$onInit = () => {
      vm.stripMarkdown = val => removeMd(val)

      vm.downloadResource = function(dataset, resource) {
        if (resource['ams:resourceType'] === 'table') {
          if (angular.isUndefined(vm.apiData.schema_tables)) {
            api.getByUrl(resource['dcat:accessURL']).then(function(response) {
              if (angular.isArray(response.tables)) {
                vm.apiData.schema_tables = response.tables
              }
            })
          }
        } else {
          const resourceUrl = resource['ams:purl']
          store.dispatch(downloadDatasetResource({ dataset, resourceUrl }))
        }
      }
    }

    /* istanbul ignore next */
    // eslint-disable-next-line complexity
    vm.$onChanges = changes => {
      const { detailTemplateUrl, detailData, detailFilterSelection } = changes
      if (!(detailTemplateUrl && detailData)) return
      if (detailTemplateUrl && detailTemplateUrl.previousValue !== detailTemplateUrl.currentValue) {
        vm.includeSrc = detailTemplateUrl.currentValue
      }

      if (detailData && detailData.previousValue !== detailData.currentValue) {
        vm.apiData = {
          results: detailData.currentValue,
          schema_tables: undefined,
        }
      }

      if (
        detailFilterSelection &&
        detailFilterSelection.previousValue !== detailFilterSelection.currentValue
      ) {
        vm.filterSelection = detailFilterSelection.currentValue
      }
    }
  }
})()
