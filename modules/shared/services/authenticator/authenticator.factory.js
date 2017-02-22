(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('authenticator', authenticatorFactory);

    authenticatorFactory.$inject = [
        '$http',
        '$interval',
        'API_CONFIG',
        'user',
        '$window',
        '$location'
    ];

    function authenticatorFactory (
        $http,
        $interval,
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

        const REFRESH_INTERVAL = 1000 * 60 * 4.5;   // every 4.5 minutes
        const RETRY_INTERVAL = 1000 * 5; // every 5 seconds

        const STATE = {
            INIT: () =>
                STATE.RESTORE_REFRESH_TOKEN,
            RESTORE_REFRESH_TOKEN: () =>
                user.getRefreshToken() ? STATE.REQUEST_ACCESS_TOKEN : STATE.REQUEST_ANONYMOUS_REFRESH_TOKEN,
            REQUEST_ANONYMOUS_REFRESH_TOKEN: () =>
                requestAnonymousToken(),
            ON_REFRESH_TOKEN: () =>
                STATE.REQUEST_ACCESS_TOKEN,
            ON_ANONYMOUS_REFRESH_TOKEN_ERROR: () =>
                tokenLoop(STATE.REQUEST_ANONYMOUS_REFRESH_TOKEN, RETRY_INTERVAL),
            ON_AUTHENTICATED_REFRESH_TOKEN_ERROR: () =>
                STATE.REQUEST_ANONYMOUS_REFRESH_TOKEN,
            REQUEST_ACCESS_TOKEN: () =>
                requestAccessToken(user.getRefreshToken()),
            ON_ACCESS_TOKEN: () =>
                tokenLoop(STATE.REQUEST_ACCESS_TOKEN, REFRESH_INTERVAL),
            ON_ANONYMOUS_ACCESS_TOKEN_ERROR: () =>
                tokenLoop(STATE.REQUEST_ANONYMOUS_REFRESH_TOKEN, RETRY_INTERVAL),
            ON_AUTHENTICATED_ACCESS_TOKEN_ERROR: () =>
                STATE.REQUEST_ANONYMOUS_REFRESH_TOKEN,
            ON_LOGOUT: () =>
                STATE.REQUEST_ANONYMOUS_REFRESH_TOKEN,
            WAITING: () =>
                null // Wait for re-invocation of the tokenLoop...
        };

        let interval;    // refresh or retry

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
                interval = $interval(() => tokenLoop(state), delay, 1); // $timeout will fail with protractor tests
                return STATE.WAITING;
            } else if (interval) {
                $interval.cancel(interval);
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

        function onRequestAnonymousTokenError (response) {
            onError(response, STATE.ON_ANONYMOUS_REFRESH_TOKEN_ERROR);
        }

        function onRequestUserTokenError (response) {
            onError(response, STATE.ON_AUTHENTICATED_REFRESH_TOKEN_ERROR);
        }

        function onRequestAccessTokenError (response) {
            onError(response, user.getUserType() === user.USER_TYPE.AUTHENTICATED
                ? STATE.ON_AUTHENTICATED_ACCESS_TOKEN_ERROR : STATE.ON_ANONYMOUS_ACCESS_TOKEN_ERROR);
        }

        function logout () {
            user.clearToken();
            tokenLoop(STATE.ON_LOGOUT);
        }

        function onError (response, state) {
            user.clearToken();
            setError(
                ERROR_MESSAGES[response.status] ||
                'Er is een fout opgetreden. Neem contact op met de beheerder en vermeld' +
                ' code: ' + response.status + ' status: ' + response.statusText + '.',
                response.status,
                response.statusText);
            tokenLoop(state);
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
            $window.location.href =
                API_CONFIG.AUTH + '/siam/authenticate?active=true&callback=' + encodeURIComponent(url);
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
                $location.replace();    // overwrite the existing location
                $location.search(newParams);
            });
        }

        function requestAnonymousToken () {
            authRequest('/refreshtoken')
                .then(response => onRefreshToken(response.data, user.USER_TYPE.ANONYMOUS),
                    onRequestAnonymousTokenError);
            return STATE.WAITING;
        }

        function requestUserToken (params) {
            let httpParams = AUTH_PARAMS.reduce((result, key) => {
                result[key] = params[key];
                return result;
            }, {});
            return authRequest('/siam/token', {}, httpParams)
                .then(response => onRefreshToken(response.data, user.USER_TYPE.AUTHENTICATED),
                    onRequestUserTokenError);
        }

        function requestAccessToken (token) {
            authRequest('/accesstoken', {'Authorization': API_CONFIG.AUTH_HEADER_PREFIX + token})
                .then(response => onAccessToken(response.data),
                    onRequestAccessTokenError);
            return STATE.WAITING;
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
