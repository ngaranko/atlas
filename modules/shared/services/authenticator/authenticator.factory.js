(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('authenticator', authenticatorFactory);

    authenticatorFactory.$inject = [
        '$http',
        '$interval',
        'sharedConfig',
        'user',
        '$window',
        '$location',
        'storage',
        'uriStripper'
    ];

    function authenticatorFactory (
        $http,
        $interval,
        sharedConfig,
        user,
        $window,
        $location,
        storage,
        uriStripper
    ) {
        const ERROR_MESSAGES = {
            400: 'Verplichte parameter is niet aanwezig.',
            404: 'Er is iets mis met de inlog server, probeer het later nog eens.',
            502: 'Probleem in de communicatie met de inlog server.',
            504: 'Inlog server timeout, probeer het later nog eens.'
        };

        const AUTH_PARAMS = ['access_token', 'token_type', 'expires_in', 'state'];

        const AUTH_PATH = 'oauth2/';
        const LOGIN_PATH = 'authorize?idp_id=datapunt&response_type=token&client_id=citydata-data.amsterdam.nl';

        const CALLBACK_PARAMS = 'callbackParams'; // save callback params in session storage
        const STATE_TOKEN = 'stateToken'; // save state token in session storage
        const ACCESS_TOKEN = 'accessToken'; // save access token in session storage

        const error = {}; // message, status and statusText

        let initialized = false;

        return {
            initialize,
            login,
            logout,
            isCallback,
            handleCallback,
            error
        };

        function initialize () {
            if (!initialized) {
                initialized = true;
                setError();
                restoreAccessToken();
            }
        }

        function login () { // redirect to external authentication provider
            const callback = $location.absUrl().replace(/#.*$/, ''); // Remove all parameters
            const stateToken = generateStateToken(); // Get a random string to prevent XSS

            savePath(); // Save current path in session
            saveStateToken(stateToken); // Save the state token in session

            $window.location.href =
                sharedConfig.API_ROOT + AUTH_PATH + LOGIN_PATH +
                `&state=${stateToken}&redirect_uri=${encodeURIComponent(callback)}`;
        }

        function logout () {
            user.clearToken();
            removeAccessToken();
        }

        function isCallback (params) {
            // The state param must be exactly the same as the state token we
            // have saved in the session (to prevent XSS)
            const stateTokenValid = params.state && params.state === getStateToken();

            // it is a callback when all authorization parameters are defined in the params
            // the fastest check is not to check if all parameters are defined but
            // to check that no undefined parameter can be found
            const paramsValid = AUTH_PARAMS.reduce((acc, param) => {
                return acc && angular.isDefined(params[param]);
            }, true);

            return Boolean(stateTokenValid && paramsValid);
        }

        function hasError (params) {
            return angular.isDefined(params.error_code);
        }

        function handleCallback (params) { // request user token with returned authorization parameters from callback
            if (isCallback(params)) {
                if (!hasError(params)) {
                    useAccessToken(params.access_token);
                    return true;
                }
                onError(params);
            }
            return false;
        }

        function restoreAccessToken () {
            const accessToken = getAccessToken();
            if (accessToken) {
                user.setAccessToken(accessToken);
            }
        }

        function useAccessToken (token) {
            setError();
            user.setAccessToken(token);
            saveAccessToken(token);
            removeStateToken(); // Remove state token from session
            restorePath(); // Restore path from session
        }

        function onError (response, state) {
            user.clearToken();
            setError(
                ERROR_MESSAGES[response.status] ||
                'Er is een fout opgetreden. Neem contact op met de beheerder en vermeld ' +
                'code: ${response.status}, status: ${response.statusText}.',
                response.status,
                response.statusText);
            removeStateToken(); // Remove state token from session
            restorePath(); // Restore path from session
        }

        function setError (message, status, statusText) {
            error.message = message || '';
            error.status = status || null;
            error.statusText = statusText || '';
        }

        function savePath () {
            const params = $location.search();
            if (params.dte) {
                // $location.search may return old parameters even though URL does not list them.
                // This mean the dte parameter may incorrectly contain the domain:
                //  e.g.: https:data.amsterdam.nl/foo/bar instead of foo/bar.
                // This step ensures no domain and protocol are stored, so the correct path is restored after login.
                // Seems like an Angular bug when not using HTML5 $location provider. Consider removing when/if
                // HTML5 location mode is activated. https://github.com/angular/angular.js/issues/1521
                params.dte = uriStripper.stripDomain(params.dte);
            }
            storage.session.setItem(CALLBACK_PARAMS, angular.toJson(params)); // encode params
        }

        function restorePath () {
            const params = storage.session.getItem(CALLBACK_PARAMS);
            storage.session.removeItem(CALLBACK_PARAMS);
            if (params) {
                $location.replace(); // overwrite the existing location (prevent back button to re-login)
                $location.search(angular.fromJson(params));
            }
        }

        function generateStateToken () {
            return 'randomString';
        }

        function saveStateToken (stateToken) {
            storage.session.setItem(STATE_TOKEN, stateToken);
        }

        function getStateToken () {
            return storage.session.getItem(STATE_TOKEN);
        }

        function removeStateToken () {
            storage.session.removeItem(STATE_TOKEN);
        }

        function saveAccessToken (accessToken) {
            storage.session.setItem(ACCESS_TOKEN, accessToken);
        }

        function getAccessToken () {
            return storage.session.getItem(ACCESS_TOKEN);
        }

        function removeAccessToken (accessToken) {
            storage.session.removeItem(ACCESS_TOKEN);
        }
    }
})();
