(function () {
    angular
        .module('dpShared')
        .constant('ACTIONS', {
            URL_CHANGE: {
                id: 'URL_CHANGE'
            },

            FETCH_SEARCH_RESULTS_BY_QUERY: {
                id: 'FETCH_SEARCH_RESULTS_BY_QUERY'
            },
            FETCH_SEARCH_RESULTS_BY_LOCATION: {
                id: 'FETCH_SEARCH_RESULTS_BY_LOCATION'
            },
            FETCH_SEARCH_RESULTS_CATEGORY: {
                id: 'FETCH_SEARCH_RESULTS_CATEGORY'
            },
            SHOW_SEARCH_RESULTS: {
                id: 'SHOW_SEARCH_RESULTS'
            },

            MAP_SET_BASELAYER: {
                id: 'MAP_SET_BASELAYER'
            },
            MAP_ADD_OVERLAY: {
                id: 'MAP_ADD_OVERLAY'
            },
            MAP_REMOVE_OVERLAY: {
                id: 'MAP_REMOVE_OVERLAY'
            },
            MAP_TOGGLE_VISIBILITY_OVERLAY: {
                id: 'MAP_TOGGLE_VISIBILITY_OVERLAY'
            },
            MAP_CLICK: {
                id: 'MAP_CLICK'
            },
            MAP_PAN: {
                id: 'MAP_PAN'
            },
            MAP_ZOOM: {
                id: 'MAP_ZOOM'
            },
            MAP_FULLSCREEN: {
                id: 'MAP_FULLSCREEN'
            },
            SHOW_MAP_ACTIVE_OVERLAYS: {
                id: 'SHOW_MAP_ACTIVE_OVERLAYS'
            },
            HIDE_MAP_ACTIVE_OVERLAYS: {
                id: 'HIDE_MAP_ACTIVE_OVERLAYS'
            },

            FETCH_DETAIL: {
                id: 'FETCH_DETAIL'
            },
            SHOW_DETAIL: {
                id: 'SHOW_DETAIL'
            },

            FETCH_STRAATBEELD: {
                id: 'FETCH_STRAATBEELD',
            },
            FETCH_STRAATBEELD_BY_LOCATION: {
                id: 'FETCH_STRAATBEELD_BY_LOCATION'
            },
            SHOW_STRAATBEELD_INITIAL: {
                id: 'SHOW_STRAATBEELD_INITIAL'
            },
            SHOW_STRAATBEELD_SUBSEQUENT: {
                id: 'SHOW_STRAATBEELD_SUBSEQUENT'
            },
            HIDE_STRAATBEELD: {
                id: 'HIDE_STRAATBEELD'
            },
            SET_STRAATBEELD_ORIENTATION: {
                id: 'SET_STRAATBEELD_ORIENTATION'
            },

            SHOW_DATA_SELECTION: {
                id: 'SHOW_DATA_SELECTION'
            },
            SHOW_SELECTION_LIST: {
                id: 'SHOW_SELECTION_LIST'
            },
            NAVIGATE_DATA_SELECTION: {
                id: 'NAVIGATE_DATA_SELECTION'
            },
            TOGGLE_DATA_SELECTION_LIST_VIEW: {
                id: 'TOGGLE_DATA_SELECTION_LIST_VIEW'
            },

            SHOW_LAYER_SELECTION: {
                id: 'SHOW_LAYER_SELECTION'
            },
            HIDE_LAYER_SELECTION: {
                id: 'HIDE_LAYER_SELECTION'
            },

            SHOW_HOME: {
                id: 'SHOW_HOME'
            },
            SHOW_PAGE: {
                id: 'SHOW_PAGE'
            },

            SHOW_PRINT: {
                id: 'SHOW_PRINT'
            },
            HIDE_PRINT: {
                id: 'HIDE_PRINT'
            }
        });
})();
