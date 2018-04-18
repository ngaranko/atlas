(function () {
    'use strict';

    // This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpShared')
        .factory('dpCombinedDocumentTitle', documentTitleFactory);

    documentTitleFactory.$inject = [
        'dpSearchResultsDocumentTitle',
        'dpDetailDocumentTitle'
    ];

    function documentTitleFactory (
        dpSearchResultsDocumentTitle,
        dpDetailDocumentTitle
    ) {
        return {
            getTitle: getTitle
        };

        function getTitle (fullState) {
            let combinedTitle;

            if (fullState.detail && fullState.detail.display) {
                combinedTitle = dpDetailDocumentTitle.getTitle(fullState.detail);
            } else if (fullState.search && fullState.search.numberOfResults) {
                combinedTitle = dpSearchResultsDocumentTitle.getTitle(fullState.search);
            }

            return combinedTitle;
        }
    }
})();
