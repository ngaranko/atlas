(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('authenticator', authenticatorFactory);

    authenticatorFactory.$inject = [
        '$http',
        '$timeout',
        'API_CONFIG',
        'user',
        '$window',
        '$location'
    ];

    function authenticatorFactory (
        $http,
        $timeout,
        API_CONFIG,
        user,
        $window,
        $location) {
        const ERROR_MESSAGES = {
            400: 'Verplichte parameter is niet aanwezig',
            404: 'Er is iets mis met de inlog server, probeer het later nog eens.',
            502: 'Probleem in de communicatie met de inlog server',
            504: 'Inlog server timeout, probeer het later nog eens.'
        };

        const AUTH_PARAMS = ['a-select-server', 'aselect_credentials', 'rid'];

        const REFRESH_INTERVAL = 1000 * 60 * 0.5;   // every 4.5 minutes
        const RETRY_INTERVAL = 1000 * 5; // every 5 seconds

        const STATE = {
            INIT: () => STATE.RESTORE_REFRESH_TOKEN,
            RESTORE_REFRESH_TOKEN: () => {
                if (user.getRefreshToken()) {
                    return STATE.REQUEST_ACCESS_TOKEN;
                } else {
                    return STATE.REQUEST_ANONYMOUS_REFRESH_TOKEN;
                }
            },
            REQUEST_ANONYMOUS_REFRESH_TOKEN: () => {
                requestAnonymousToken();
                return STATE.REQUESTING;
            },
            ON_REFRESH_TOKEN: () => STATE.REQUEST_ACCESS_TOKEN,
            REQUEST_ACCESS_TOKEN: () => {
                requestAccessToken(user.getRefreshToken());
                return STATE.REQUESTING;
            },
            ON_ACCESS_TOKEN: () => STATE.REFRESH_ACCESS_TOKEN,
            REFRESH_ACCESS_TOKEN: () => {
                tokenLoop(STATE.REQUEST_ACCESS_TOKEN, REFRESH_INTERVAL);
                return STATE.WAITING;
            },
            ON_ERROR: () => {
                tokenLoop(STATE.RESTART, RETRY_INTERVAL);
                return STATE.WAITING;
            },
            ON_MAIN_ERROR: () => {
                tokenLoop(STATE.REQUEST_ANONYMOUS_REFRESH_TOKEN, RETRY_INTERVAL);
                return STATE.WAITING;
            },
            ON_LOGOUT: () => STATE.RESTART,
            RESTART: () => STATE.REQUEST_ANONYMOUS_REFRESH_TOKEN,
            REQUESTING: () => null,
            WAITING: () => null
        };

        let timeout;    // refresh or retry

        let error = {}; // message, status and statusText

        return {
            initialize,
            login,
            logout,
            isCallback,
            handleCallback,
            error
        };

        function tokenLoop (state, delay) {
            if (delay) {
                timeout = $timeout(() => tokenLoop(state), delay);
                return;
            } else if (timeout) {
                $timeout.cancel(timeout);
            }

            while (state) {
                state = state();
            }
        }

        function initialize () {
            setError();
            tokenLoop(STATE.INIT);
        }

        function onRefreshToken (token, userType) {
            setError();
            user.setRefreshToken(token, userType);
            tokenLoop(STATE.ON_REFRESH_TOKEN);
        }

        function onAccessToken (token) {
            setError();
            user.setAccessToken(token);
            tokenLoop(STATE.ON_ACCESS_TOKEN);
        }

        function onMainError (response) {
            onError(response, STATE.ON_MAIN_ERROR);
        }

        function onError (response, state = STATE.ON_ERROR) {
            user.clearToken();
            setError(
                ERROR_MESSAGES[response.status] ||
                'Er is een fout opgetreden. Neem contact op met de beheerder en vermeld' +
                ' code: ' + response.status + ' status: ' + response.statusText + '.',
                response.status,
                response.statusText);
            tokenLoop(state);
        }

        function logout () {
            user.clearToken();
            tokenLoop(STATE.ON_LOGOUT);
        }

        function setError (message, status, statusText) {
            error.message = message || '';
            error.status = status || null;
            error.statusText = statusText || '';
        }

        function login () {
            let url = $location.absUrl();
            if (url.indexOf('#') === -1) {
                url += '#';
            }
            const callbackUrl = encodeURIComponent(url);
            const authenticationUrl = API_CONFIG.AUTH + '/siam/authenticate?active=true&callback=' + callbackUrl;
            $window.location.href = authenticationUrl;
        }

        function isCallback (params) {
            // true when unable to find an non-existent value for any of the authorization params
            return !AUTH_PARAMS.find(key => angular.isUndefined(params[key]));
        }

        function handleCallback (params) {
            return requestUserToken(params).finally(() => {
                // Return params without authorization parameters (includes also language, sorry)
                let newParams = angular.copy(params);
                ['language'].concat(AUTH_PARAMS).forEach(key => delete newParams[key]);
                $location.replace();
                $location.search(newParams);
            });
        }

        function requestAnonymousToken () {
            return authRequest('/refreshtoken')
                .then(response => onRefreshToken(response.data, user.USER_TYPE.ANONYMOUS), onMainError);
        }

        function requestUserToken (params) {
            let httpParams = AUTH_PARAMS.reduce((result, key) => {
                result[key] = params[key];
                return result;
            }, {});
            return authRequest('/siam/token', {}, httpParams)
                .then(response => onRefreshToken(response.data, user.USER_TYPE.AUTHENTICATED), onError);
        }

        function requestAccessToken (token) {
            return authRequest('/accesstoken', {'Authorization': API_CONFIG.AUTH_HEADER_PREFIX + token})
                .then(response => onAccessToken(response.data), onError);
        }

        function authRequest (url, headers, params) {
            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + url,
                headers: angular.merge({'Content-Type': 'text/plain'}, headers),
                params: params
            });
        }
    }
})();
