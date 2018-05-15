import * as piwik from '../../../../src/shared/services/piwik-tracker/piwik-tracker';
import * as mapDocumentTitle from '../../../../src/map/services/document-title/document-title';

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
        'dpStraatbeeldDocumentTitle',
        'dpCombinedDocumentTitle',
        '$interval'
    ];

    function DpDocumentTitleDirective ( // eslint-disable-line max-params
        $document,
        $q,
        store,
        dashboardColumns,
        dpDataSelectionDocumentTitle,
        dpDetailDocumentTitle,
        dpPageDocumentTitle,
        dpSearchResultsDocumentTitle,
        dpStraatbeeldDocumentTitle,
        dpCombinedDocumentTitle,
        $interval
    ) {
        const mapping = [
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
            }, {
                visibility: 'mapPreviewPanel',
                documentTitle: dpCombinedDocumentTitle,
                state: 'map'
            }, {
                visibility: 'dataSelectionOnMap',
                documentTitle: dpCombinedDocumentTitle,
                state: 'map'
            }, {
                visibility: 'map',
                documentTitle: mapDocumentTitle,
                state: 'map'
            }];

        return {
            restrict: 'A',
            transclude: true,
            scope: true,
            template: '{{title}}',
            link: linkFn
        };

        function getPrintOrEmbedOrPreviewTitleAddition (state) {
            if (!state || !state.ui) {
                return '';
            }

            if (state.ui.isPrintMode) {
                return ' | Printversie';
            } else if (state.ui.isEmbedPreview) {
                return ' | Embedversie';
            } else if (state.ui.isEmbed) {
                return ' | Embedded';
            }
            return '';
        }

        function isStateLoading (state) {
            // return isLoading keys from state reduced to one boolean
            return Object.keys(state).reduce(
                (acc, item) => acc || (state[item] && state[item].isLoading),
                state.isLoading
            );
        }

        function linkFn (scope, element, attrs, controller, transcludeFn) {
            const baseTitle = transcludeFn().text();
            let trackerInterval;
            let previousTitle;

            store.subscribe(setTitle);

            function triggerTracker () {
                // make sure that the page is finished loading.
                // before actually tracking the navigation
                const state = store.getState();
                if (!isStateLoading(state) && scope.title !== previousTitle) {
                    $interval.cancel(trackerInterval);
                    piwik.trackPageNavigation();
                    previousTitle = scope.title;
                }
            }

            function setTitle () { // eslint-disable-line complexity
                let titleData;
                const state = store.getState();
                const visibility = dashboardColumns.determineVisibility(state);
                const activity = dashboardColumns.determineActivity(state);

                // combine specific activity values with the visibility object
                const combinedVisibilityActivity = {
                    ...visibility,
                    mapPreviewPanel: activity.mapPreviewPanel,
                    dataSelectionOnMap: activity.dataSelection
                };
                const filtered = mapping.filter(item =>
                    combinedVisibilityActivity[item.visibility]
                );

                // mapping.filter returns an array, possibly empty
                const current = filtered[0];
                const hasPreviewPanel = current && current.visibility === 'mapPreviewPanel';
                const isDataSelectionOnMap = current && current.visibility === 'dataSelectionOnMap';
                const stateData = current ? state[current.state] : null;
                const displayNewTitle = current && stateData && !stateData.isLoading;
                const getTitle = displayNewTitle ? current.documentTitle.getTitle : null;
                const printOrEmbedOrPreviewTitleAddition = getPrintOrEmbedOrPreviewTitleAddition(state);

                if (hasPreviewPanel || current && current.state === 'map' || isDataSelectionOnMap) {
                    // if previewpanel or current state = map, pass along full state
                    titleData = getTitle ? getTitle(state) : null;
                } else {
                    titleData = getTitle ? getTitle(stateData, state.filters) : null;
                }

                if (angular.isString(titleData)) {
                    const q = $q.defer();
                    q.resolve(titleData);
                    titleData = q.promise;
                }
                if (displayNewTitle && titleData) {
                    titleData.then(result => {
                        const enrichedResult = result
                            ? `${result}${printOrEmbedOrPreviewTitleAddition} - `
                            : `${printOrEmbedOrPreviewTitleAddition}`;
                        scope.title = `${enrichedResult}${baseTitle}`;

                        $interval.cancel(trackerInterval); // cancel running interval
                        trackerInterval = $interval(triggerTracker, 200);
                    });
                }
            }
        }
    }
})();
