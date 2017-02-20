
(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('authenticator', authenticatorFactory);

    authenticationFactory.$inject = [
        '$http',
        '$timeout',
        'API_CONFIG',
        'userSettings',
        '$window',
        '$location',
        'environment',
        'AUTHENTICATION_SETTINGS'
    ];

    function authenticatorFactory (
        $http,
        $timeout,
        API_CONFIG,
        userSettings,
        $window,
        $location,
        environment,
        AUTHENTICATION_SETTINGS) {
        const USER = ['NONE', 'ANONYMOUS', 'AUTHENTICATED'].reduce((states, state) => {
            states[state] = state;
            return states;
        }, {});

        const TOKEN = ['NONE', 'REFRESH', 'REQUEST', 'VALID', 'ERROR'].reduce((states, state) => {
            states[state] = state;
            return states;
        }, {});

        let state = {
            userState: USER.NONE,
            tokenState: TOKEN.NONE,
            token: null,
            errorMessage: ''
        };

        return {
            initialize,
            login,
            logout,
            getState,
            handleCallback
        };

        function initialize () {
            $timeout(checkState, 1000); // Check state every second...
        }

        function checkState () {
            switch (state.tokenState) {
                case TOKEN.NONE:
                    requestAnonymousToken().then(token => {
                        state.tokenState = TOKEN.ANONYMOUS;
                    }, errorMessage => {
                        state.tokenState = TOKEN.ERROR;
                    });
                    break;
                case TOKEN.VALID:
                    if (token.lifetime > MAX_TOKEN_LIFETIME) {
                        refreshToken(token);
                    }
                    break;
                case TOKEN.ERROR:
                    break;
            }
        }

        function handleCallback (params) {
            if (params['a-select-server'] && params['aselect_credentials'] && params['rid']) {
                requestUserToken(params['a-select-server'], params['aselect_credentials'], params['rid']);
            }
        }

        function login (callbackUrl) {
            const authenticationUrl = API_CONFIG.AUTH + '/siam/authenticate?active=true&callback=' + callbackUrl;
        }

        function logOut () {
            userSettings.refreshToken.remove();

            state.userState = USER.NONE;
            state.tokenState = TOKEN.NONE;
            state.token = null;
        }

        function requestAnonymousToken () {
            state.userState = USER.ANONYMOUS;
            state.tokenState = TOKEN.REQUEST;

            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + '/refreshtoken',
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(response => onSuccess(response.data), onError);
        }

        function requestUserToken (server, credentials, rid) {
            state.userState = USER.AUTHENTICATED;
            state.tokenState = TOKEN.REQUEST;

            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + '/siam/token',
                headers: {
                    'Content-Type': 'text/plain'
                },
                params: {
                    'a-select-server': server,
                    'aselect_credentials': credentials,
                    rid
                }
            }).then(response => onSuccess(response.data), onError);
        }

        function refreshToken (token) {
            state.tokenState = TOKEN.REFRESH;

            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + '/accesstoken',
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': API_CONFIG.AUTHZ_HEADER_PREFIX + token
                }
            }).then(response => onSuccess(response.data), onError);
        }

        function onSuccess (token) {
            state.tokenState = TOKEN.VALID;
        }

        function onError (response) {
            state.tokenState = TOKEN.ERROR;

            let errorMessages = {
                400: 'Verplichte parameter is niet aanwezig',
                404: 'Er is iets mis met de inlog server, probeer het later nog eens.',
                502: 'Probleem in de communicatie met de inlog server',
                504: 'Inlog server timeout, probeer het later nog eens.'
            };
            state.errorMessage = errorMessages[response.status] ||
                'Er is een fout opgetreden. Neem contact op met de beheerder en vermeld' +
                ' code: ' + response.status + ' status: ' + response.statusText + '.';
        }

        function getState () {
            return state;
        }
    }
})();
