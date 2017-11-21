(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrlMiddleware', stateToUrlMiddlewareFactory);

    stateToUrlMiddlewareFactory.$inject = ['stateToUrl', 'ACTIONS'];

    function stateToUrlMiddlewareFactory (stateToUrl, ACTIONS) {
        return function (store) {
            return function (next) {
                return function (action) {
                    var returnValue;

                    // Update the state first
                    returnValue = next(action);

                    // Then update the URL
                    if (!action.type.ignore && proceedWithType(action.type)) {
                        stateToUrl.update(
                            store.getState(),
                            angular.isObject(action.type) && Boolean(action.type.replace)
                        );
                    }
                    return returnValue;
                };

                function proceedWithType (type) {
                    if (!angular.isString(type)) {
                        return false;
                    }
                    return type !== 'AUTHENTICATE_USER' || type.endsWith('_MAP_PANEL');
                }
            };
        };
    }
})();
