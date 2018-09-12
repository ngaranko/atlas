import contextMiddleware
    from '../../../../../src/shared/services/context-middleware/context-middleware';

(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('contextMiddleware', contextMiddlewareFactory);

    function contextMiddlewareFactory() {
        return contextMiddleware;
    }
})();
