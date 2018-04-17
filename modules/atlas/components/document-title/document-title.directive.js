(function () {
    angular
        .module('atlas')
        .directive('dpDocumentTitle', DpDocumentTitleDirective);

    DpDocumentTitleDirective.$inject = [
        '$document',
        '$q',
        'store',
        'dashboardColumns',
        'dpDataSelectionDocumentTitle',
        'dpDetailDocumentTitle',
        'dpPageDocumentTitle',
        'dpSearchResultsDocumentTitle',
        'dpStraatbeeldDocumentTitle'
    ];

    function DpDocumentTitleDirective (
        $document,
        $q,
        store,
        dashboardColumns,
        dpDataSelectionDocumentTitle,
        dpDetailDocumentTitle,
        dpPageDocumentTitle,
        dpSearchResultsDocumentTitle,
        dpStraatbeeldDocumentTitle
    ) {
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
            }];

        return {
            restrict: 'A',
            transclude: true,
            scope: true,
            template: '{{title}}',
            link: linkFn
        };

        function linkFn (scope, element, attrs, controller, transcludeFn) {
            var baseTitle = transcludeFn().text();
            scope.title = baseTitle;

            store.subscribe(setTitle);

            function setTitle () {
                const state = store.getState(),
                    visibility = dashboardColumns.determineVisibility(state),
                    filtered = mapping.filter(item => visibility[item.visibility]),
                    // mapping.filter returns an array, possibly empty
                    current = filtered[0],
                    stateData = current ? state[current.state] : null,
                    displayNewTitle = current && stateData && !stateData.isLoading,
                    getTitle = displayNewTitle ? current.documentTitle.getTitle : null;

                let titleData = getTitle ? getTitle(stateData, state.filters) : null;

                if (angular.isString(titleData)) {
                    const q = $q.defer();
                    q.resolve(titleData);
                    titleData = q.promise;
                }
                if (displayNewTitle && titleData) {
                    titleData.then(result => scope.title = (result ? result + ' - ' : '') + baseTitle);
                }
            }
        }
    }
})();
