(function () {
    'use strict';

    // This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpShared')
        .factory('dpCombinedDocumentTitle', documentTitleFactory);

    documentTitleFactory.$inject = [
        'dpSearchResultsDocumentTitle',
        'dpDetailDocumentTitle',
        'dpMapDocumentTitle',
        '$q'
    ];

    function documentTitleFactory (
        dpSearchResultsDocumentTitle,
        dpDetailDocumentTitle,
        dpMapDocumentTitle,
        $q
    ) {
        return {
            getTitle: getTitle
        };

        function getTitle (fullState) {
            const q = $q.defer();

            dpMapDocumentTitle.getTitle().then(result => {
                if (fullState.detail && fullState.detail.display) {
                    q.resolve(`${dpDetailDocumentTitle.getTitle(fullState.detail)} - ${result}`);
                } else if (fullState.search && fullState.search.numberOfResults) {
                    q.resolve(`${dpSearchResultsDocumentTitle.getTitle(fullState.search)} - ${result}`);
                }
            });

            return q.promise;
        }
    }
})();
