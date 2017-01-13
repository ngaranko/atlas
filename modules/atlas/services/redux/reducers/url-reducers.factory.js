(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlReducers', urlReducersFactory);

    urlReducersFactory.$inject = ['ACTIONS', 'STATE_URL_CONVERSION', 'stateUrlConverter'];

    function urlReducersFactory (ACTIONS, STATE_URL_CONVERSION, stateUrlConverter) {
        return {
            [ACTIONS.URL_CHANGE.id]: urlChangeReducer
        };

        function urlChangeReducer (oldState, payload) {
            return stateUrlConverter.params2state(oldState, payload);
        }
    }
})();
