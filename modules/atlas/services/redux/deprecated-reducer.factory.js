(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('deprecatedReducer', deprecatedReducerFactory);

    deprecatedReducerFactory.$inject = [
        '$window',
        'urlReducers',
        'freeze',
        'homeReducers',
        'pageReducers',
        'searchReducers',
        'straatbeeldReducers',
        'dataSelectionReducers',
        'filtersReducers',
        'environment'
    ];

    // eslint-disable-next-line max-params
    function deprecatedReducerFactory (
        $window,
        urlReducers,
        freeze,
        homeReducers,
        pageReducers,
        searchReducers,
        straatbeeldReducers,
        dataSelectionReducers,
        filtersReducers,
        environment
    ) {
        return function (oldState, action) { // eslint-disable-line complexity, max-statements
            /**
             *
             *
             *
             * Try not to add new stuff to this file. DEPRECATED
             *
             *
             *
             */
            const DetailsReducer = $window.reducers.detailReducer;
            const MapPreviewPanelReducer = $window.reducers.MapPreviewPanelReducer;
            const MapSearchResultsReducer = $window.reducers.MapSearchResultsReducer;
            const MapClickLocationReducer = $window.reducers.MapClickLocationReducer;

            const detailReducers = {
                FETCH_DETAIL: DetailsReducer,
                SHOW_DETAIL: DetailsReducer,
                DETAIL_FULLSCREEN: DetailsReducer
            };

            const mapSearchResultsReducers = {
                FETCH_MAP_SEARCH_RESULTS_FAILURE: MapSearchResultsReducer,
                FETCH_MAP_SEARCH_RESULTS_REQUEST: MapSearchResultsReducer,
                FETCH_MAP_SEARCH_RESULTS_SUCCESS: MapSearchResultsReducer
            };

            const mapClickLocationReducers = {
                SET_MAP_CLICK_LOCATION: MapClickLocationReducer
            };

            const mapPreviewPanelReducers = {
                OPEN_MAP_PREVIEW_PANEL: MapPreviewPanelReducer,
                CLOSE_MAP_PREVIEW_PANEL: MapPreviewPanelReducer,
                MAXIMIZE_MAP_PREVIEW_PANEL: MapPreviewPanelReducer
            };

            // TODO: Redux: replace
            // Warning: angular.merge is deprecated
            // -- https://docs.angularjs.org/api/ng/function/angular.merge
            var actions = angular.merge(
                dataSelectionReducers,
                detailReducers,
                filtersReducers,
                homeReducers,
                mapPreviewPanelReducers,
                mapSearchResultsReducers,
                mapClickLocationReducers,
                pageReducers,
                searchReducers,
                straatbeeldReducers,
                urlReducers,
                environment
            );

            // Are we dealing with vanilla js reducers here (type is a
            // string instead of an object with an ID and other
            // optional attributes)? e.g.:
            // {
            //      type: 'SHOW_DETAIL'
            // }
            const vanilla = angular.isObject(action) &&
                angular.isString(action.type) &&
                angular.isFunction(actions[action.type]);

            // {
            //      type: {
            //          id: 'FOO'
            //      }
            // }
            const legacy = angular.isObject(action) &&
                angular.isObject(action.type) &&
                angular.isFunction(actions[action.type.id]);

            if (vanilla) {
                return actions[action.type](oldState, action);
            } else if (legacy) {
                if (detailReducers.hasOwnProperty(action.type.id)) {
                    action.payload = {
                        ...action,
                        type: action.type.id
                    };
                }

                const result = actions[action.type.id](oldState, action.payload);
                if (environment.isDevelopment()) {
                    // freeze will break dp-link in data-selection
                    // freeze.deepFreeze(result);
                }
                return result;
            }
            return oldState;
        };
    }
})();
