
(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('authenticator', authenticatorFactory);

    authenticatorFactory.$inject = [
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

        const ERROR_MESSAGES = {
            400: 'Verplichte parameter is niet aanwezig',
            404: 'Er is iets mis met de inlog server, probeer het later nog eens.',
            502: 'Probleem in de communicatie met de inlog server',
            504: 'Inlog server timeout, probeer het later nog eens.'
        };

        const AUTH_PARAMS = ['a-select-server', 'a-select_credentials', 'rid'];

        const REFRESH_INTERVAL = 1000 * 60 * 0.5;   // every 4.5 minutes
        const RETRY_INTERVAL = 1000 * 5; // every 5 seconds
        let timeout;

        let state = {};

        return {
            initialize,
            login,
            logout,
            isCallback,
            handleCallback,
            getState
        };

        function initialize () {
            clearState();
            checkToken();
        }

        function clearState () {
            if (timeout) {
                $timeout.cancel(timeout);
            }
            state.userState = USER.NONE;
            state.tokenState = TOKEN.NONE;
            state.token = null;
            state.errorMessage = '';
        }

        function checkToken () {
            console.log('checkToken');
            switch (state.tokenState) {
                case TOKEN.NONE:
                    requestAnonymousToken();
                    break;
                case TOKEN.VALID:
                    refreshToken(state.token);
                    break;
            }
        }

        function onSuccess (token) {
            console.log('onSucces', token);
            state.tokenState = TOKEN.VALID;
            state.token = token;
            state.errorMessage = '';
            timeout = $timeout(checkToken, REFRESH_INTERVAL);
        }

        function onError (response) {
            console.log('onError', response.status);
            clearState();
            state.errorMessage = ERROR_MESSAGES[response.status] ||
                'Er is een fout opgetreden. Neem contact op met de beheerder en vermeld' +
                ' code: ' + response.status + ' status: ' + response.statusText + '.';
            timeout = $timeout(checkToken, RETRY_INTERVAL);
        }

        function logout () {
            clearState();
            checkToken();
        }

        function login () {
            // http://example.com/#/some/path?foo=bar&baz=xoxo => "/some/path?foo=bar&baz=xoxo"
            const url = '#' + $location.url();
            const callbackUrl = encodeURIComponent(AUTHENTICATION_SETTINGS[environment.NAME].ENDPOINT + url);
            const authenticationUrl = API_CONFIG.AUTH + '/siam/authenticate?active=true&callback=' + callbackUrl;
            $window.location.href = authenticationUrl;
        }

        function getState () {
            return state;
        }

        function isCallback (params) {
            console.log('isCallback', params, !AUTH_PARAMS.find(key => !params[key]));
            // true when unable to find an non-existent value for any of the authorization params

            console.log('find', AUTH_PARAMS.find(key => {
                console.log('key', key, params[key]);
                return angular.isUndefined(params[key]);
            }));
            return false;
        }

        function handleCallback (params) {
            console.log('handleCallback', params);
            return requestUserToken(params).then(() => {
                // Return params without authorization parameters
                let newParams = angular.copy(params);
                AUTH_PARAMS.forEach(key => delete newParams[key]);
                $location.search(newParams);
            });
        }

        function requestAnonymousToken () {
            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + '/refreshtoken',
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(onSuccess, onError);
        }

        function requestUserToken (params) {
            let httpParams = AUTH_PARAMS.reduce((result, key) => {
                result[key] = params[key];
                return result;
            }, {});

            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + '/siam/token',
                headers: {
                    'Content-Type': 'text/plain'
                },
                params: httpParams
            }).then(onSuccess, onError);
        }

        function refreshToken (token) {
            console.log('refreshToken', token);
            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + '/accesstoken',
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': API_CONFIG.AUTHZ_HEADER_PREFIX + token
                }
            }).then(onSuccess, onError);
        }
    }
})();
