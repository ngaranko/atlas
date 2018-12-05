/* eslint-disable */
// Todo: remove this file.
import {
    getNumberOfResults,
    loadMore,
    replaceBuurtcombinatie
} from '../../../../src/shared/services/search/search';
import { fetchMapSearchResultsSuccessPanel } from '../../../../src/shared/ducks/data-search/actions';

(() => {
    'use strict';

    angular
        .module('dpSearchResults')
        .component('dpSearchResults', {
            bindings: {
                show: '=',
                isLoading: '=',
                query: '@',
                location: '=',
                category: '@',
                numberOfResults: '=',
                user: '<',
                previewPanorama: '<',
                isPreviewPanoramaLoading: '<'
            },
            templateUrl: 'modules/search-results/components/search-results/search-results.html',
            controller: DpSearchResultsController,
            controllerAs: 'vm'
        });

    DpSearchResultsController.$inject = [
        '$rootScope', '$scope', 'store', 'activeOverlays'
    ];

    function DpSearchResultsController ($rootScope, $scope, store, activeOverlays) {
        const vm = this;

        $scope.$watchCollection('vm.location', () => {
            if (!vm.isLoading) {
                searchByLocation(vm.location);
            }
        });

        // Show warning depending on authorization
        $scope.$watch('vm.user.scopes', updateWarningMessage);

        vm.loadMore = function () {
            vm.isLoadMoreLoading = true;

            loadMore(vm.searchResults[0]).then(function (searchResults) {
                vm.searchResults[0] = searchResults;
            }).finally(() => {
                vm.isLoadMoreLoading = false;
            });
        };

        vm.layerWarning = '';

        function updateWarningMessage () {
            const kadastraleSubject = vm.searchResults &&
                vm.searchResults.find(category => category.slug === 'subject');

            if (kadastraleSubject) {
                if (!vm.user.scopes.includes('BRK/RSN')) {
                    kadastraleSubject.warning = 'Medewerkers met speciale bevoegdheden' +
                        ' kunnen alle gegevens vinden (ook natuurlijke personen).';
                } else {
                    delete kadastraleSubject.warning;
                }
            }

            vm.layerWarning = !vm.query ? activeOverlays.getOverlaysWarning() : '';
        }

        /**
         * For both SEARCH BY QUERY (with and without category) and GEOSEARCH
         */
        function setSearchResults (searchResults) {
            const numberOfResults = getNumberOfResults(searchResults);

            store.dispatch(fetchMapSearchResultsSuccessPanel(searchResults));
            // TODO: refactor, really consider moving all business logic out of this view and into redux!

            // @TODO remove the exception when backend uses correct sub type name tg-3551
            searchResults = replaceBuurtcombinatie(searchResults);

            vm.searchResults = searchResults;

            vm.hasLoadMore = function () {
                return angular.isString(vm.category) &&
                    vm.searchResults[0].count > vm.searchResults[0].results.length &&
                    !vm.isLoadMoreLoading;
            };
        }
    }
})();
