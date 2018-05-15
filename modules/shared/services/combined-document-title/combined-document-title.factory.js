import * as mapDocumentTitle from '../../../../src/map/services/document-title/document-title';

(function () {
    'use strict';

    // This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpShared')
        .factory('dpCombinedDocumentTitle', documentTitleFactory);

    documentTitleFactory.$inject = [
        'dpSearchResultsDocumentTitle',
        'dpDetailDocumentTitle',
        '$q'
    ];

    function documentTitleFactory (
        dpSearchResultsDocumentTitle,
        dpDetailDocumentTitle,
        $q
    ) {
        return {
            getTitle: getTitle
        };

        function getTitle (fullState) {
            const q = $q.defer();

            mapDocumentTitle.getTitle(fullState).then(result => {
                if (fullState.detail && fullState.detail.display) {
                    q.resolve(`${dpDetailDocumentTitle.getTitle(fullState.detail)} | ${result}`);
                } else if (fullState.search && fullState.search.numberOfResults) {
                    q.resolve(`${dpSearchResultsDocumentTitle.getTitle(fullState.search)} | ${result}`);
                } else {
                    q.resolve(result);
                }
            });

            return q.promise;
        }
    }
})();
