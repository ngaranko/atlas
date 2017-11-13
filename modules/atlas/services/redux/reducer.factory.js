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
    function reducerFactory ($rootScope,
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
                             environment) {
        return function (oldState, action) { // eslint-disable-line complexity
            const DetailsReducers = $window.reducers.detailReducer;
            const UserReducer = $window.reducers.UserReducer;
            const MapLayersReducer = $window.reducers.MapLayersReducer;
            const MapPanelReducer = $window.reducers.MapPanelReducer;
            const MapOverlaysReducer = $window.reducers.MapOverlaysReducer;
            const MapBaseLayersReducer = $window.reducers.MapBaseLayersReducer;
            const UiReducer = $window.reducers.UiReducer;

            // TODO: Redux: replace
            // Warning: angular.merge is deprecated
            // -- https://docs.angularjs.org/api/ng/function/angular.merge

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

            const mapPanelReducers = {
                HIDE_MAP_PANEL: MapOverlaysReducer,
                SHOW_MAP_PANEL: MapOverlaysReducer,
                TOGGLE_MAP_PANEL: MapOverlaysReducer
            };

            const uiReducers = {
                TOGGLE_MAP_LAYERS: UiReducer
            };

            var actions = angular.merge(
                urlReducers,
                detailReducers,
                mapPanelReducers,
                mapOverlaysReducer,
                mapBaseLayersReducer,
                mapLayersReducer,
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

            if (detailReducers.hasOwnProperty(action.type.id)) {
                action.payload = {
                    payload: action.payload,
                    type: action.type.id
                };
            }

            if (userReducer.hasOwnProperty(action.type)) {
                return UserReducer(oldState, action);
            }

            if (mapLayersReducer.hasOwnProperty(action.type)) {
                return MapLayersReducer(oldState, action);
            }

            if (mapBaseLayersReducer.hasOwnProperty(action.type)) {
                const newState = MapBaseLayersReducer(oldState, action);
                $timeout(() => $rootScope.$digest());
                return newState;
            }

            if (mapPanelReducers.hasOwnProperty(action.type)) {
                return MapPanelReducer(oldState, action);
            }

            if (mapOverlaysReducer.hasOwnProperty(action.type)) {
                const newState = MapOverlaysReducer(oldState, action);
                $timeout(() => $rootScope.$digest());
                return newState;
            }

            /* istanbul ignore if */
            if (uiReducers.hasOwnProperty(action.type)) {
                return UiReducer(oldState, action);
            }

            if (angular.isObject(action) &&
                angular.isObject(action.type) &&
                angular.isFunction(actions[action.type.id])) {
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
