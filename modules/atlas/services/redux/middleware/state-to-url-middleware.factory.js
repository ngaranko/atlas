(() => {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrlMiddleware', stateToUrlMiddlewareFactory);

    stateToUrlMiddlewareFactory.$inject = ['stateToUrl', 'ACTIONS'];

    function stateToUrlMiddlewareFactory (stateToUrl, ACTIONS) {
        return (store) => {
            return (next) => {
                return (action) => {
                    // Are we dealing with vanilla js reducers here (type is a
                    // string instead of an object with an ID and other
                    // optional attributes)?
                    const vanilla = angular.isString(action.type);

                    // Update the state first
                    const returnValue = next(action);

                    // Then update the URL
                    if ((vanilla || !action.type.ignore) &&
                        action.type !== 'AUTHENTICATE_USER'
                    ) {
                        stateToUrl.update(
                            store.getState(),
                            !vanilla && Boolean(action.type.replace)
                        );
                    }
                    return returnValue;
                };
            };
        };
    }
})();
