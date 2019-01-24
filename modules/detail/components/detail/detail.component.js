import removeMd from 'remove-markdown';
import { downloadDatasetResource } from '../../../../src/shared/ducks/datasets/data/data';

(function () {
    angular
        .module('dpDetail')
        .component('dpDetail', {
            bindings: {
                endpoint: '@',
                previewPanorama: '<',
                isPreviewPanoramaLoading: '<',
                isLoading: '=',
                catalogFilters: '=',
                user: '<',
                detailTemplateUrl: '<',
                detailData: '<',
                detailFilterSelection: '<'
            },
            templateUrl: 'modules/detail/components/detail/detail.html',
            controller: DpDetailController,
            controllerAs: 'vm'
        });

    DpDetailController.$inject = [
        'store'
    ];

    function DpDetailController (store) {
        const vm = this;

        vm.stripMarkdown = (val) => removeMd(val);

        vm.downloadResource = (dataset, resourceUrl) =>
            store.dispatch(downloadDatasetResource({ dataset, resourceUrl }));

        /* istanbul ignore next */
        vm.$onChanges = (changes) => {
            if (changes.detailTemplateUrl.previousValue !== changes.detailTemplateUrl.currentValue) {
                vm.includeSrc = changes.detailTemplateUrl.currentValue;
            }

            if (changes.detailData.previousValue !== changes.detailData.currentValue) {
                vm.apiData = {
                    results: changes.detailData.currentValue
                };
            }

            if (changes.detailFilterSelection.previousValue !== changes.detailFilterSelection.currentValue) {
                vm.filterSelection = changes.detailFilterSelection.currentValue;
            }
        };
    }
})();
