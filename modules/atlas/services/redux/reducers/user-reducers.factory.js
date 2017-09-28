(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('userReducers', userReducersFactory);

    userReducersFactory.$inject = ['ACTIONS'];

    function userReducersFactory (ACTIONS) {
        return {
            [ACTIONS.USER_AUTHENTICATED.id]: userAuthenticatedReducer,
            [ACTIONS.USER_SCOPES.id]: userScopesReducer
        };

        function userAuthenticatedReducer (oldState, payload) {
            return {
                ...oldState,
                user: {
                    ...oldState.user,
                    authenticated: payload
                }
            };
        }

        function userScopesReducer (oldState, payload) {
            return {
                ...oldState,
                user: {
                    ...oldState.user,
                    scopes: payload.reduce((acc, scope) => {
                        acc[scope] = true;
                        return acc;
                    }, {})
                }
            };
        }
    }
})();
