(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('layerSelectionReducers', layerSelectionReducersFactory);

    layerSelectionReducersFactory.$inject = ['ACTIONS'];

    function layerSelectionReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.SHOW_LAYER_SELECTION.id] = showLayerSelectionReducer;
        reducers[ACTIONS.HIDE_LAYER_SELECTION.id] = hideLayerSelectionReducer;

        return reducers;

        function showLayerSelectionReducer (state) {
            return {
                ...state,
                layerSelection: {
                    ...state.layerSelection,
                    isEnabled: true
                }
            };
        }

        function hideLayerSelectionReducer (state) {
            return {
                ...state,
                layerSelection: {
                    ...state.layerSelection,
                    isEnabled: false
                }
            };
        }
    }
})();
