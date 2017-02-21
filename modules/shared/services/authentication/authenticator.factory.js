
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
        const TOKEN_STATE = {
            NONE: 'NONE',
            VALID: 'VALID'
        };

        const ERROR_MESSAGES = {
            400: 'Verplichte parameter is niet aanwezig',
            404: 'Er is iets mis met de inlog server, probeer het later nog eens.',
            502: 'Probleem in de communicatie met de inlog server',
            504: 'Inlog server timeout, probeer het later nog eens.'
        };

        const AUTH_PARAMS = ['a-select-server', 'aselect_credentials', 'rid'];

        const REFRESH_INTERVAL = 1000 * 60 * 0.5;   // every 4.5 minutes
        const RETRY_INTERVAL = 1000 * 5; // every 5 seconds

        let timeout;    // refresh or retry

        let state = {
            tokenState: TOKEN_STATE.NONE,
            errorMessage: ''
        };

        return {
            initialize,
            login,
            logout,
            isCallback,
            handleCallback
        };

        function initialize () {
            if (user.getRefreshToken()) {
                state.tokenState = TOKEN_STATE.VALID;
                state.errorMessage = '';
            } else {
                clearState();
            }
            checkToken();
        }

        function clearState () {
            if (timeout) {
                $timeout.cancel(timeout);
            }
            user.clearToken();
            state.tokenState = TOKEN_STATE.NONE;
            state.errorMessage = '';
        }

        function checkToken () {
            console.log('checkToken', state.tokenState);
            switch (state.tokenState) {
                case TOKEN_STATE.NONE:
                    requestAnonymousToken();
                    break;
                case TOKEN_STATE.VALID:
                    refreshToken(user.getRefreshToken());
                    break;
            }
        }

        function onSuccess (token, userType) {
            console.log('onSucces', token, userType);
            if (userType) {
                // refresh token
                user.setRefreshToken(token, userType);
            } else {
                // access token
                user.setAccessToken(token);
            }
            state.tokenState = TOKEN_STATE.VALID;
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
            let url = $location.absUrl();
            if (url.indexOf('#') === -1) {
                url += '#';
            }
            console.log('callback url', url);
            const callbackUrl = encodeURIComponent(url);
            const authenticationUrl = API_CONFIG.AUTH + '/siam/authenticate?active=true&callback=' + callbackUrl;
            $window.location.href = authenticationUrl;
        }

        function isCallback (params) {
            // logParams(params);
            // true when unable to find an non-existent value for any of the authorization params
            return !AUTH_PARAMS.find(key => angular.isUndefined(params[key]));
        }

        function handleCallback (params) {
            // logParams(params);
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
                .then(response => onSuccess(response.data, user.USER_TYPE.ANONYMOUS), onError);
        }

        function requestUserToken (params) {
            let httpParams = AUTH_PARAMS.reduce((result, key) => {
                result[key] = params[key];
                return result;
            }, {});
            return authRequest('/siam/token', {}, httpParams)
                .then(response => onSuccess(response.data, user.USER_TYPE.AUTHENTICATED), onError);
        }

        function refreshToken (token) {
            return authRequest('/accesstoken', {'Authorization': API_CONFIG.AUTH_HEADER_PREFIX + token})
                .then(response => onSuccess(response.data), onError);
        }

        function authRequest(url, headers, params) {
            console.log('auth request', url, headers, params);
            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + url,
                headers: angular.merge({'Content-Type': 'text/plain'}, headers),
                params: params
            });
        }
    }
})();
