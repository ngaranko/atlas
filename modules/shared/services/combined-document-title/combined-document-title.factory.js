import * as mapDocumentTitle from '../../../../src/map/services/document-title/document-title';

(function () {
    'use strict';

    // This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpShared')
        .factory('dpCombinedDocumentTitle', documentTitleFactory);

    documentTitleFactory.$inject = [
        'dpSearchResultsDocumentTitle',
        'dpDataSelectionDocumentTitle',
        'dpDetailDocumentTitle',
        '$q'
    ];

    function documentTitleFactory (
        dpSearchResultsDocumentTitle,
        dpDataSelectionDocumentTitle,
        dpDetailDocumentTitle,
        $q
    ) {
        return {
            getTitle: getTitle
        };

        function getTitle (fullState) {
            const q = $q.defer();
            const filters = fullState.filters;

            mapDocumentTitle.getTitle(fullState).then(result => {
                if (fullState.dataSelection && fullState.dataSelection.view.length) {
                    q.resolve(`${dpDataSelectionDocumentTitle.getTitle(fullState.dataSelection, filters)} | ${result}`);
                } else if (fullState.detail && fullState.detail.display) {
                    q.resolve(`${dpDetailDocumentTitle.getTitle(fullState.detail, filters)} | ${result}`);
                } else if (fullState.search && fullState.search.numberOfResults) {
                    q.resolve(`${dpSearchResultsDocumentTitle.getTitle(fullState.search, filters)} | ${result}`);
                } else {
                    q.resolve(result);
                }
            });

            return q.promise;
        }
    }
})();
