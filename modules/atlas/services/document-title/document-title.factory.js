(function () {
    angular
        .module('atlas')
        .factory('documentTitle', documentTitleFactory);

    documentTitleFactory.$inject = [
        '$document',
        'store',
        'dashboardColumns',
        'dpDataSelectionDocumentTitle',
        'dpDetailDocumentTitle',
        'dpLayerSelectionDocumentTitle',
        'dpMapDocumentTitle',
        'dpPageDocumentTitle',
        'dpSearchResults.documentTitle',
        'dpStraatbeeldDocumentTitle'

    ];

    function documentTitleFactory (
            $document,
            store,
            dashboardColumns,
            dpDataSelectionDocumentTitle,
            dpDetailDocumentTitle,
            dpLayerSelectionDocumentTitle,
            dpMapDocumentTitle,
            dpPageDocumentTitle,
            dpSearchResultsDocumentTitle,
            dpStraatbeeldDocumentTitle) {

        var mapping = [
            {
                visibility: 'dataSelection',
                documentTitle: dpDataSelectionDocumentTitle,
                state: 'dataSelection'
            }, {
                visibility: 'detail',
                documentTitle: dpDetailDocumentTitle,
                state: 'detail'
            }, {
                visibility: 'layerSelection',
                documentTitle: dpLayerSelectionDocumentTitle,
                state: 'layerSelection'
            }, {
                visibility: 'page',
                documentTitle: dpPageDocumentTitle,
                state: 'page'
            }, {
                visibility: 'searchResults',
                documentTitle: dpSearchResultsDocumentTitle,
                state: 'search'
            }, {
                visibility: 'straatbeeld',
                documentTitle: dpStraatbeeldDocumentTitle,
                state: 'straatbeeld'
            }, {
                visibility: 'map',
                documentTitle: dpMapDocumentTitle,
                state: 'map'
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
                    displayNewTitle = current && stateData && !stateData.isLoading,
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
