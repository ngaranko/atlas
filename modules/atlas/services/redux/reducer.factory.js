import { combineReducers } from 'redux';

/* istanbul ignore next */
(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = [
        '$window',
        '$rootScope',
        '$timeout',
        'deprecatedReducer'
    ];

    // eslint-disable-next-line max-params
    function reducerFactory (
             $window,
             $rootScope,
             $timeout,
             deprecatedReducer
        ) {
        return function (oldState, action) { // eslint-disable-line complexity
            // Run state changes based on old reducers
            const deprecatedState = deprecatedReducer(oldState, action);

            const MapPanelLayersReducer = $window.reducers.PanelLayersReducer;
            const MapLayersReducer = $window.reducers.MapLayersReducer;
            const MapBaseLayersReducer = $window.reducers.MapBaseLayersReducer;
            const MapReducer = $window.reducers.MapReducer;

            const mapLayers = combineReducers({
                layers: MapLayersReducer,
                baseLayers: MapBaseLayersReducer,
                panelLayers: MapPanelLayersReducer
            });

            // Use combine reducer for new reducers
            const ErrorMessageReducer = $window.reducers.ErrorMessageReducer;
            const MapDetailReducer = $window.reducers.MapDetailReducer;
            const PanoPreviewReducer = $window.reducers.PanoPreviewReducer;
            const UiReducer = $window.reducers.UiReducer;
            const DataSelectionReducer = $window.reducers.DataSelectionReducer;
            const PageReducer = $window.reducers.PageReducer;
            const StraatbeeldReducer = $window.reducers.StraatbeeldReducer;
            const UserReducer = $window.reducers.UserReducer;
            const autoSuggestReducer = $window.reducers.AutoSuggestReducer;
            const DataSelectionCatalogReducer = $window.reducers.DataSelectionCatalogReducer;
            const newRootReducer = combineReducers({
                dataSelection: DataSelectionReducer,
                page: PageReducer,
                error: ErrorMessageReducer,
                map: MapReducer,
                mapDetail: MapDetailReducer,
                pano: PanoPreviewReducer,
                straatbeeld: StraatbeeldReducer,
                ui: UiReducer,
                user: UserReducer,
                mapLayers,
                autoSuggest: autoSuggestReducer,
                catalogFilters: DataSelectionCatalogReducer
            });
            const filteredState = {
                dataSelection: deprecatedState.dataSelection,
                page: deprecatedState.page,
                map: deprecatedState.map,
                mapDetail: deprecatedState.mapDetail,
                straatbeeld: deprecatedState.straatbeeld,
                ui: deprecatedState.ui,
                user: deprecatedState.user,

                // Using oldState instead of chaining deprecatedState from
                // other reducer for the following fields.
                // This is because these fields do not recide in the URL state,
                // the URL resolution step in the deprecatedReducer would
                // therefore reset these fields in the state.
                error: oldState.error,
                pano: oldState.pano,
                mapLayers: oldState.mapLayers,
                autoSuggest: oldState.autoSuggest,
                catalogFilters: oldState.catalogFilters
            };

            // Combine old and new reducer states
            const newState = {
                ...deprecatedState,
                ...newRootReducer(filteredState, action)
            };

            $timeout(() => $rootScope.$digest());

            return newState;
        };
    }
})();
