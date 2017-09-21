(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('authenticator', authenticatorFactory);

    authenticatorFactory.$inject = [
        '$interval',
        'sharedConfig',
        'user',
        '$window',
        '$location',
        'storage',
        'uriStripper',
        'httpStatus',
        'stateTokenGenerator',
        'queryStringParser',
        'Raven'
    ];

    // eslint-disable-next-line max-params
    function authenticatorFactory (
        $interval,
        sharedConfig,
        user,
        $window,
        $location,
        storage,
        uriStripper,
        httpStatus,
        stateTokenGenerator,
        queryStringParser,
        Raven
    ) {
        // A map of the error keys, that the OAuth2 authorization service can
        // return, to a full description
        const ERROR_MESSAGES = {
            invalid_request: 'The request is missing a required parameter, includes an invalid parameter value, ' +
                'includes a parameter more than once, or is otherwise malformed.',
            unauthorized_client: 'The client is not authorized to request an access token using this method.',
            access_denied: 'The resource owner or authorization server denied the request.',
            unsupported_response_type: 'The authorization server does not support obtaining an access token using ' +
                'this method.',
            invalid_scope: 'The requested scope is invalid, unknown, or malformed.',
            server_error: 'The authorization server encountered an unexpected condition that prevented it from ' +
                'fulfilling the request.',
            temporarily_unavailable: 'The authorization server is currently unable to handle the request due to a ' +
                'temporary overloading or maintenance of the server.'
        };

        // The parameters the OAuth2 authorization service will return on
        // success
        const AUTH_PARAMS = ['access_token', 'token_type', 'expires_in', 'state'];

        // The URI we need to redirect to for communication with the OAuth2
        // authorization service
        const AUTH_PATH = 'oauth2/';
        const LOGIN_PATH = 'authorize?idp_id=datapunt&response_type=token&client_id=citydata';

        // The keys of values we need to store in the session storage
        //
        // Query string of the state at the moment we redirect to the OAuth2
        // authorization service, and need to get back to afterwards
        const CALLBACK_PARAMS = 'callbackParams';
        // The OAuth2 state(token) (OAuth terminology, has nothing to do with
        // our app state), which is a random string
        const STATE_TOKEN = 'stateToken';
        // The access token returned by the OAuth2 authorization service
        // containing user scopes and name
        const ACCESS_TOKEN = 'accessToken';

        let initialized = false;

        return {
            initialize,
            login,
            logout
        };

        function initialize () {
            if (!initialized) {
                initialized = true;
                restoreAccessToken(); // Restore acces token from session storage
                catchError(); // Catch any error from the OAuth2 authorization service
                handleCallback(); // Handle a callback from the OAuth2 authorization service
            }
        }

        /**
         * Redirects to the OAuth2 authorization service.
         */
        function login () {
            // Get the URI the OAuth2 authorization service needs to use as
            // callback
            const callback = $location.absUrl().replace(/#.*$/, ''); // Remove all parameters
            const stateToken = $window.encodeURIComponent(stateTokenGenerator()); // Get a random string to prevent CSRF

            if (!stateToken) {
                // crypto library is not available on the current browser
                httpStatus.registerError(httpStatus.LOGIN_ERROR);
                return;
            }

            savePath(); // Save current path in session
            saveStateToken(stateToken); // Save the state token in session

            $window.location.href =
                sharedConfig.API_ROOT + AUTH_PATH + LOGIN_PATH +
                `&state=${stateToken}&redirect_uri=${encodeURIComponent(callback)}`;
        }

        /**
         * Removes the access token from the user and the session storage.
         */
        function logout () {
            user.clearToken();
            removeAccessToken();
        }

        /**
         * Do the given params form a callback from the OAuth2 authorization
         * service?
         *
         * @param {Object.<string, string>} params The parameters returned.
         * @return boolean True when all `AUTH_PARAMS` are available and the
         * `state` param equals to the value set in the session storage,
         * otherwise false.
         */
        function isCallback (params) {
            if (!params) {
                return false;
            }

            // The state param must be exactly the same as the state token we
            // have saved in the session (to prevent CSRF)
            const stateTokenValid = params.state && params.state === getStateToken();

            // It is a callback when all authorization parameters are defined
            // in the params the fastest check is not to check if all
            // parameters are defined but to check that no undefined parameter
            // can be found
            const paramsValid = !AUTH_PARAMS.some((param) => {
                return angular.isUndefined(params[param]);
            });

            if (paramsValid && !stateTokenValid) {
                // This is a callback, but the state token does not equal the
                // one we have saved; report to Sentry
                Raven.captureMessage(new Error(`Authenticator encountered an invalid state token (${params.state})`));
            }

            return Boolean(stateTokenValid && paramsValid);
        }

        /**
         * Gets the access token in case we have a valid callback. Uses the
         * authorization parameters from the access token.
         *
         * @returns boolean True when this is a callback, otherwise false.
         */
        function handleCallback () {
            const params = queryStringParser($location.url());
            if (isCallback(params)) {
                useAccessToken(params.access_token);
                return true;
            }
            return false;
        }

        /**
         * Restores the access token from session storage when available.
         */
        function restoreAccessToken () {
            const accessToken = getAccessToken();
            if (accessToken) {
                user.setAccessToken(accessToken);
            }
        }

        /**
         * Finishes the callback from the OAuth2 authorization service.
         */
        function useAccessToken (token) {
            user.setAccessToken(token);
            saveAccessToken(token);
            removeStateToken(); // Remove state token from session
            const pathParams = storage.session.getItem(CALLBACK_PARAMS);
            if (pathParams) {
                restorePath(pathParams); // Restore path from session
            }
        }

        /**
         * Handles errors in case they were returned by the OAuth2
         * authorization service.
         */
        function catchError () {
            const params = queryStringParser($window.location.search);
            if (params && params.error) {
                handleError(params.error, params.error_description);
            }
        }

        /**
         * Finishes an error from the OAuth2 authorization service.
         *
         * @param code {string} Error code as returned from the service.
         * @param description {string} Error description as returned from the
         * service.
         */
        function handleError (code, description) {
            Raven.captureMessage(new Error(
                `Authorization service responded with error ${code} [${description}] (${ERROR_MESSAGES[code]})`));
            removeStateToken(); // Remove state token from session
            restorePath(storage.session.getItem(CALLBACK_PARAMS)); // Restore path from session
            removeErrorParamsFromPath();
        }

        /**
         * Saves the current search parameters (our state in the URL) to the
         * session storage.
         */
        function savePath () {
            const params = $location.search();
            if (params.dte) {
                // $location.search may return old parameters even though URL does not list them.
                // This mean the dte parameter may incorrectly contain the domain:
                // e.g.: https://data.amsterdam.nl/foo/bar instead of foo/bar.
                // This step ensures no domain and protocol are stored, so the correct path is restored after login.
                // Seems like an Angular bug when not using HTML5 $location provider. Consider removing when/if
                // HTML5 location mode is activated. https://github.com/angular/angular.js/issues/1521
                params.dte = uriStripper.stripDomain(params.dte);
            }
            storage.session.setItem(CALLBACK_PARAMS, angular.toJson(params)); // encode params
        }

        /**
         * Restores saved search parameters from the session storage (by
         * `savePath`) to the URL.
         *
         * @param {string} paramString The parameter string as saved in the
         * session storage.
         */
        function restorePath (paramString) {
            storage.session.removeItem(CALLBACK_PARAMS);
            const params = paramString ? angular.fromJson(paramString) : {};

            $location.replace(); // overwrite the existing location (prevent back button to re-login)
            $location.url(''); // remove the parameters from the authorization service
            $location.search(params);
        }

        /**
         * Removes parameters from the URL, as set by an error callback from
         * the OAuth2 authorization service, to clean up the URL.
         */
        function removeErrorParamsFromPath () {
            $interval(
                () => $window.location.href = $window.location.protocol + '//' +
                    $window.location.host + $window.location.pathname +
                    '#' + $location.url(),
                0, 1);
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
