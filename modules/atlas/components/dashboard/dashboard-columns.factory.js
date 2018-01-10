(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('dashboardColumns', dashboardColumnsFactory);

    function dashboardColumnsFactory () {
        /*
        - activity means the component is loaded (ng-if)
        - visibility means the component is shown, inactive components are never shown (ng-show)
        - columnSizes also determine whether or not something is fullscreen (.u-col-sm--12)
         */
        return {
            determineActivity,
            determineVisibility,
            determineColumnSizes,
            hasLimitedWidth,
            isPrintOrEmbedOrPreview
        };

        function determineActivity (state) {
            return {
                map: determineMapActivity(state),
                searchResults: angular.isObject(state.search),
                page: angular.isString(state.page.name),
                detail: angular.isObject(state.detail),
                straatbeeld: angular.isObject(state.straatbeeld),
                dataSelection: angular.isObject(state.dataSelection)
            };
        }

        function determineVisibility (state) {
            const activity = determineActivity(state);
            const visibility = {};
            const { ui = {} } = state;

            visibility.error = state.error.hasErrors || state.user.error;
            visibility.map = activity.map;

            if (angular.isObject(state.dataSelection) && !ui.isMapFullscreen) {
                visibility.dataSelection = true;

                visibility.detail = false;
                visibility.page = false;
                visibility.searchResults = false;
                visibility.straatbeeld = false;
            } else {
                visibility.straatbeeld = activity.straatbeeld;

                if (visibility.straatbeeld && state.straatbeeld.isFullscreen) {
                    visibility.detail = false;
                    visibility.page = false;
                    visibility.searchResults = false;
                } else if (ui.isMapFullscreen) {
                    visibility.detail = false;
                    visibility.page = false;
                    visibility.searchResults = false;
                    visibility.straatbeeld = false;
                } else {
                    visibility.detail = activity.detail && !activity.straatbeeld;
                    visibility.page = angular.isString(state.page.name) && !activity.straatbeeld;
                    visibility.searchResults = activity.searchResults;
                }

                visibility.dataSelection = false;
            }

            const geoSearchActive = activity.searchResults &&
                angular.isArray(state.search.location);

            visibility.mapPreviewPanel =
                ui.isMapFullscreen &&
                (geoSearchActive || activity.detail) &&
                !angular.isObject(state.dataSelection);

            return visibility;
        }

        function determineMapActivity (state) {
            if (isPrintOrEmbedOrPreview(state)) {
                return determineMapActivityPrint(state);
            } else {
                return determineMapActivityDefault(state);
            }
        }

        function determineMapActivityDefault (state) {
            const { ui = {} } = state;
            return ui.isMapFullscreen ||
                (
                    !(state.page.name && !ui.isMapFullscreen && !state.straatbeeld) &&
                    !(state.detail && state.detail.isFullscreen) &&
                    !(state.dataSelection && state.dataSelection.view !== 'LIST') &&
                    !(state.search && state.search.isFullscreen) &&
                    !(state.straatbeeld && state.straatbeeld.isFullscreen)
                );
        }

        function determineMapActivityPrint (state) {
            if (isEmbedOrPreviewWithFullscreenMap(state)) {
                return true;
            }

            if (state.ui.isMapFullscreen) {
                return true;
            } else if (state.straatbeeld) {
                return !state.straatbeeld.isFullscreen;
            } else if (state.dataSelection) {
                // Show the map when in list view of data selection
                return state.dataSelection.view === 'LIST';
            } else if (angular.isObject(state.detail)) {
                // Only print the map when detail is NOT fullscreen and has geometry
                return !state.detail.isFullscreen && angular.isObject(state.detail.geometry);
            } else {
                return !state.page.name && !state.search;
            }
        }

        function determineColumnSizes (state) {
            const visibility = determineVisibility(state);
            const hasFullscreenElement = visibility.page ||
                (visibility.map && state.ui.isMapFullscreen) ||
                (visibility.straatbeeld && state.straatbeeld.isFullscreen) ||
                (visibility.detail && state.detail.isFullscreen) ||
                (visibility.searchResults && state.search.isFullscreen) ||
                (visibility.dataSelection && state.dataSelection.isFullscreen);

            if (isPrintOrEmbedOrPreview(state)) {
                return determineColumnSizesPrint (state, visibility, hasFullscreenElement);
            } else {
                return determineColumnSizesDefault (state, visibility, hasFullscreenElement);
            }
        }

        function determineColumnSizesDefault (state, visibility, hasFullscreenElement) {
            const columnSizes = {};

            if (hasFullscreenElement) {
                columnSizes.left = 0;
                columnSizes.middle = state.ui.isMapFullscreen ? 12 : 0;
                columnSizes.right = !state.ui.isMapFullscreen ? 12 : 0;
            } else {
                columnSizes.left = 0;
                columnSizes.middle = 4;
                columnSizes.right = 8;
            }

            return columnSizes;
        }

        function determineColumnSizesPrint (state, visibility, hasFullscreenElement) {
            const columnSizes = {};

            if (hasFullscreenElement) {
                columnSizes.left = 0;
                columnSizes.middle = state.ui.isMapFullscreen ? 12 : 0;
                columnSizes.right = !state.ui.isMapFullscreen ? 12 : 0;
            } else {
                columnSizes.left = 0;
                columnSizes.middle = visibility.page || visibility.searchResults ? 0 : 12;
                columnSizes.right = visibility.dataSelection ? 0 : 12;
            }

            return columnSizes;
        }

        function hasLimitedWidth (state) {
            const visibility = determineVisibility(state);
            return Boolean(visibility.page);
        }

        function isEmbedOrPreviewWithFullscreenMap (state) {
            return (state.ui.isEmbed || state.ui.isEmbedPreview) &&
                state.ui.isMapFullscreen && !state.straatbeeld;
        }

        function isPrintOrEmbedOrPreview (state) {
            return state.ui && (state.ui.isPrintMode || state.ui.isEmbedPreview || state.ui.isEmbed);
        }
    }
})();
