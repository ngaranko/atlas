(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = [
        '$rootScope',
        '$timeout',
        '$window',
        'urlReducers',
        'freeze',
        'homeReducers',
        'layerSelectionReducers',
        'mapReducers',
        'pageReducers',
        'searchReducers',
        'straatbeeldReducers',
        'dataSelectionReducers',
        'printReducers',
        'embedReducers',
        'filtersReducers',
        'environment'
    ];

    // eslint-disable-next-line max-params
    function reducerFactory (
        $rootScope,
        $timeout,
        $window,
        urlReducers,
        freeze,
        homeReducers,
        layerSelectionReducers,
        mapReducers,
        pageReducers,
        searchReducers,
        straatbeeldReducers,
        dataSelectionReducers,
        printReducers,
        embedReducers,
        filtersReducers,
        environment
    ) {
        return function (oldState, action) { // eslint-disable-line complexity, max-statements
            const DetailsReducers = $window.reducers.detailReducer;
            const UserReducer = $window.reducers.UserReducer;
            const MapLayersReducer = $window.reducers.MapLayersReducer;
            const MapPanelReducer = $window.reducers.MapPanelReducer;
            const MapPreviewPanelReducer = $window.reducers.MapPreviewPanelReducer;
            const MapOverlaysReducer = $window.reducers.MapOverlaysReducer;
            const MapBaseLayersReducer = $window.reducers.MapBaseLayersReducer;
            const MapGeoSearchReducer = $window.reducers.MapGeoSearchReducer;
            const PanoPreviewReducer = $window.reducers.PanoPreviewReducer;

            const detailReducers = {
                FETCH_DETAIL: DetailsReducers,
                SHOW_DETAIL: DetailsReducers,
                DETAIL_FULLSCREEN: DetailsReducers
            };

            const userReducer = {
                AUTHENTICATE_USER: UserReducer,
                AUTHENTICATE_ERROR: UserReducer
            };

            const mapLayersReducer = {
                FETCH_MAP_LAYERS_FAILURE: MapLayersReducer,
                FETCH_MAP_LAYERS_REQUEST: MapLayersReducer,
                FETCH_MAP_LAYERS_SUCCESS: MapLayersReducer
            };

            const mapBaseLayersReducer = {
                FETCH_MAP_BASE_LAYERS_FAILURE: MapBaseLayersReducer,
                FETCH_MAP_BASE_LAYERS_REQUEST: MapBaseLayersReducer,
                FETCH_MAP_BASE_LAYERS_SUCCESS: MapBaseLayersReducer,
                SET_MAP_BASE_LAYER: MapBaseLayersReducer
            };

            const mapOverlaysReducer = {
                TOGGLE_MAP_OVERLAY: MapOverlaysReducer,
                TOGGLE_MAP_OVERLAYS: MapOverlaysReducer,
                TOGGLE_MAP_OVERLAY_VISIBILITY: MapOverlaysReducer
            };

            const mapGeoSearchReducer = {
                FETCH_MAP_GEO_SEARCH_FAILURE: MapGeoSearchReducer,
                FETCH_MAP_GEO_SEARCH_REQUEST: MapGeoSearchReducer,
                FETCH_MAP_GEO_SEARCH_SUCCESS: MapGeoSearchReducer
            };

            const panoPreviewReducer = {
                FETCH_PANO_PREVIEW_FAILURE: PanoPreviewReducer,
                FETCH_PANO_PREVIEW_REQUEST: PanoPreviewReducer,
                FETCH_PANO_PREVIEW_SUCCESS: PanoPreviewReducer
            };

            const mapPanelReducers = {
                HIDE_MAP_PANEL: MapPanelReducer,
                SHOW_MAP_PANEL: MapPanelReducer,
                TOGGLE_MAP_PANEL: MapPanelReducer
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
                urlReducers,
                detailReducers,
                mapPanelReducers,
                mapPreviewPanelReducers,
                mapOverlaysReducer,
                mapBaseLayersReducer,
                mapLayersReducer,
                mapGeoSearchReducer,
                panoPreviewReducer,
                homeReducers,
                userReducer,
                layerSelectionReducers,
                mapReducers,
                pageReducers,
                searchReducers,
                straatbeeldReducers,
                dataSelectionReducers,
                printReducers,
                embedReducers,
                filtersReducers,
                environment
            );

            // Are we dealing with vanilla js reducers here (type is a
            // string instead of an object with an ID and other
            // optional attributes)?
            const vanilla = angular.isObject(action) &&
                angular.isString(action.type) &&
                angular.isFunction(actions[action.type]);

            const legacy = angular.isObject(action) &&
                angular.isObject(action.type) &&
                angular.isFunction(actions[action.type.id]);

            if (vanilla) {
                const newState = actions[action.type](oldState, action);
                $timeout(() => $rootScope.$digest());
                return newState;
            } else if (legacy) {
                if (detailReducers.hasOwnProperty(action.type.id)) {
                    action.payload = {
                        payload: action.payload,
                        type: action.type.id
                    };
                }

                const result = actions[action.type.id](oldState, action.payload);
                if (environment.isDevelopment()) {
                    freeze.deepFreeze(result);
                }
                return result;
            } else {
                // TODO: Redux: throw error
                return oldState;
            }
        };
    }
})();
