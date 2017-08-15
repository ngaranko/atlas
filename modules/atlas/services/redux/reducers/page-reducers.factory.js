(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('pageReducers', pageReducersFactory);

    pageReducersFactory.$inject = ['ACTIONS'];

    function pageReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.SHOW_PAGE.id] = showPageReducer;

        return reducers;

        /**
         * @param {Object} state
         * @param {String} payload - The name of the page, it should match the name of an HTML template from the page
         * module
         *
         * @returns {Object} newState
         */
        function showPageReducer (state, payload) {
            return {
                ...state,
                page: angular.isObject(state.page) ? {
                    ...state.page,
                    name: payload.name,
                    type: payload.type,
                    item: payload.item
                } : state.page,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    isFullscreen: false
                } : state.map,
                layerSelection: angular.isObject(state.layerSelection) ? {
                    ...state.layerSelection,
                    isEnabled: false
                } : state.layerSelection,
                search: null,
                detail: null,
                straatbeeld: null,
                dataSelection: null
            };
        }
    }
})();
