(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('dashboardColumns', dashboardColumnsFactory);

    dashboardColumnsFactory.$inject = ['httpStatus'];

    function dashboardColumnsFactory (httpStatus) {
        /*
        - activity means the component is loaded (ng-if)
        - visibility means the component is shown, inactive components are never shown (ng-show)
        - columnSizes also determine whether or not something is fullscreen (.u-col-sm--12)
         */
        return {
            determineActivity,
            determineVisibility,
            determineColumnSizes
        };

        function determineActivity (state) {
            return {
                map: determineMapActivity(state),
                layerSelection: state.layerSelection,
                searchResults: angular.isObject(state.search),
                page: angular.isString(state.page),
                detail: angular.isObject(state.detail),
                straatbeeld: angular.isObject(state.straatbeeld),
                dataSelection: angular.isObject(state.dataSelection)
            };
        }

        function determineVisibility (state) {
            const activity = determineActivity(state);
            let visibility = {};

            visibility.httpStatus = httpStatus.getStatus().hasErrors;
            visibility.map = activity.map;

            if (angular.isObject(state.dataSelection)) {
                visibility.dataSelection = true;

                visibility.layerSelection = !state.dataSelection.isFullscreen && state.layerSelection;
                visibility.detail = false;
                visibility.page = false;
                visibility.searchResults = false;
                visibility.straatbeeld = false;
            } else {
                visibility.layerSelection = state.layerSelection;
                visibility.straatbeeld = activity.straatbeeld;

                if (visibility.straatbeeld && state.straatbeeld.isFullscreen) {
                    visibility.detail = false;
                    visibility.page = false;
                    visibility.searchResults = false;
                } else if (state.layerSelection || state.map.isFullscreen) {
                    visibility.detail = false;
                    visibility.page = false;
                    visibility.searchResults = false;
                    visibility.straatbeeld = false;
                } else {
                    visibility.detail = activity.detail && !activity.straatbeeld;
                    visibility.page = angular.isString(state.page);
                    visibility.searchResults = activity.searchResults;
                }

                visibility.dataSelection = false;
            }

            return visibility;
        }

        function determineMapActivity (state) {
            if (!state.isPrintMode) {
                // Non-print mode
                return !(state.detail && state.detail.isFullscreen) &&
                    !(state.dataSelection && state.dataSelection.view !== 'LIST') &&
                    !(state.straatbeeld && state.straatbeeld.isFullscreen);
            } else {
                // Print mode
                if (state.map.isFullscreen && !state.layerSelection) {
                    return true;
                } else if (state.page || state.search || state.dataSelection || state.layerSelection) {
                    return false;
                } else if (angular.isObject(state.detail)) {
                    // Only print the map when detail is NOT fullscreen and has geometry
                    return !state.detail.isFullscreen && angular.isObject(state.detail.geometry);
                } else {
                    return state.straatbeeld && !state.straatbeeld.isFullscreen;
                }
            }
        }

        function determineColumnSizes (state) {
            const visibility = determineVisibility(state);
            const hasFullscreenElement = (visibility.map && state.map.isFullscreen) ||
                (visibility.straatbeeld && state.straatbeeld.isFullscreen) ||
                (visibility.detail && state.detail.isFullscreen) ||
                (visibility.dataSelection && state.dataSelection.isFullscreen);

            if (!state.isPrintMode) {
                return determineColumnSizesDefault (state, visibility, hasFullscreenElement);
            } else {
                return determineColumnSizesPrint (state, visibility, hasFullscreenElement);
            }
        }

        function determineColumnSizesDefault (state, visibility, hasFullscreenElement) {
            let columnSizes = {};

            if (visibility.layerSelection) {
                columnSizes.left = 4;
                columnSizes.middle = 8;
                columnSizes.right = 0;
            } else if (hasFullscreenElement) {
                columnSizes.left = 0;
                columnSizes.middle = state.map.isFullscreen ? 12 : 0;
                columnSizes.right = !state.map.isFullscreen ? 12 : 0;
            } else {
                columnSizes.left = 0;
                columnSizes.middle = 4;
                columnSizes.right = 8;
            }

            return columnSizes;
        }

        function determineColumnSizesPrint (state, visibility, hasFullscreenElement) {
            let columnSizes = {};

            if (visibility.layerSelection) {
                columnSizes.left = 12;
                columnSizes.middle = 0;
                columnSizes.right = 0;
            } else if (hasFullscreenElement) {
                columnSizes.left = 0;
                columnSizes.middle = state.map.isFullscreen ? 12 : 0;
                columnSizes.right = !state.map.isFullscreen ? 12 : 0;
            } else {
                columnSizes.left = 0;
                columnSizes.middle = visibility.page || visibility.searchResults ? 0 : 12;
                columnSizes.right = 12;
            }

            return columnSizes;
        }
    }
})();
