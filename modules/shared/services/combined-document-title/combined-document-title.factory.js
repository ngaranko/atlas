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
            const combinedTitle = [];
            const q = $q.defer();

            if (fullState.detail && fullState.detail.display) {
                combinedTitle.push(dpDetailDocumentTitle.getTitle(fullState.detail));
            } else if (fullState.search && fullState.search.numberOfResults) {
                combinedTitle.push(dpSearchResultsDocumentTitle.getTitle(fullState.search));
            }

            dpMapDocumentTitle.getTitle(fullState.map).then(result => {
                combinedTitle.push(result);

                q.resolve(combinedTitle.join(', '));
            });

            return q.promise;
        }
    }
})();
