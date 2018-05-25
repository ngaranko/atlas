import stateUrlConverter from '../../../../../src/shared/services/routing/state-url-converter';

(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlReducers', urlReducersFactory);

    urlReducersFactory.$inject = ['ACTIONS'];

    function urlReducersFactory (ACTIONS) {
        return {
            [ACTIONS.URL_CHANGE.id]: urlChangeReducer
        };

        function urlChangeReducer (oldState, payload) {
            return stateUrlConverter.params2state(oldState, payload);
        }
    }
})();
