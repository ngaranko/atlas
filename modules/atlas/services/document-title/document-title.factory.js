(function () {
    angular
        .module('atlas')
        .factory('documentTitle', documentTitleFactory);

    documentTitleFactory.$inject = [
        '$document',
        'store',
        'dashboardColumns',
        'dpSearchResults.documentTitle'/*,

        'dpDataSelection.documentTitle',
        'dpDetail.documentTitle',
        'dpLayerSelection.documentTitle',
        'dpMap.documentTitle',
        'dpPage.documentTitle',
        'dpStraatbeeld.documentTitle'*/
    ];

    function documentTitleFactory (
            $document,
            store,
            dashboardColumns,
            dpSearchResultsDocumentTitle/*,

            dpDataSelectionDocumentTitle,
            dpDetailDocumentTitle,
            dpLayerSelectionDocumentTitle,
            dpMapDocumentTitle,
            dpPageDocumentTitle,
            dpStraatbeeldDocumentTitle*/) {

        var mapping = [
            {
                visibility: 'searchResults',
                documentTitle: dpSearchResultsDocumentTitle,
                state: 'search'
            }];

        return {
            initialize: initialize
        };

        function initialize() {
            store.subscribe(setTitle);

            function setTitle() {
                var state = store.getState(),
                    visibility = dashboardColumns.determineVisibility(state),
                    filtered = mapping.filter(function(item) {
                        return visibility[item.visibility];
                    }),
                    current = filtered ? filtered[0] : null,
                    stateData = current ? state[current.state] : null,
                    displayNewTitle = current && !stateData.isLoading,
                    getTitle = displayNewTitle ? current.documentTitle.getTitle : null,
                    titleData = getTitle ? getTitle(stateData) : null,
                    title = (titleData ? titleData + ' – ' : '') + 'Atlas';

                if (displayNewTitle) {
                    $document[0].title = title;
                }
            }
        }
    }
})();
