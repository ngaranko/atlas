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
                detailData: '<'
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

        vm.$onChanges = (changes) => {
            if (changes.detailTemplateUrl) {
                vm.includeSrc = changes.detailTemplateUrl.currentValue;
            }

            if (changes.detailData) {
                vm.apiData = {
                    results: changes.detailData.currentValue
                };

                // vm.filterSelection = {
                //     [subject]: vm.apiData.results.naam
                // };
            }
        };
    }
})();
