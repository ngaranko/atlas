import stateToUrlMiddleware
    from '../../../../../src/shared/services/state-to-url-middleware/state-to-url-middleware';

(() => {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrlMiddleware', stateToUrlMiddlewareFactory);

    stateToUrlMiddlewareFactory.$inject = ['stateToUrl'];

    function stateToUrlMiddlewareFactory(stateToUrl) {
        return stateToUrlMiddleware(stateToUrl);
    }
})();
