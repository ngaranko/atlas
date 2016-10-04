(function () {
    angular
        .module('atlas')
        .factory('documentTitle', documentTitleFactory);

    documentTitleFactory.$inject = [
        '$document',
        'store',
        'dashboardColumns',

        'dpDataSelection.documentTitle',
        'dpDetail.documentTitle',
        'dpLayerSelection.documentTitle',
        'dpMap.documentTitle',
        'dpPage.documentTitle',
        'dpSearchResults.documentTitle',
        'dpStraatbeeld.documentTitle'
    ];

    function documentTitleFactory (
        $document,
        store,
        dashboardColumns/*,

        dpDataSelectionDocumentTitle,
        dpDetailDocumentTitle,
        dpLayerSelectionDocumentTitle,
        dpMapDocumentTitle,
        dpPageDocumentTitle,
        dpSearchResultsDocumentTitle,
        dpStraatbeeldDocumentTitle*/) {

        return {
            initialize: initialize
        };

        function initialize () {
            store.subscribe(setTitle);

            function setTitle () {
                var visibility,
                    state = store.getState();

                visibility = dashboardColumns.determineVisibility(state);

                //Op basis van visibilility de goede dependency aanroepen en dat stoppen in $document.title
                //console.log(visibility);
            }
        }
    }
})();