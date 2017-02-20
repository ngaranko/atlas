
(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('authentication', authenticationFactory);

    authenticationFactory.$inject = [
        '$rootScope',
        '$q',
        '$http',
        '$httpParamSerializer',
        '$timeout',
        'API_CONFIG',
        'userSettings',
        '$window',
        '$location',
        'environment',
        'AUTHENTICATION_SETTINGS',
        'applicationState'
    ];

    function authenticationFactory (
        $rootScope,
        $q,
        $http,
        $httpParamSerializer,
        $timeout,
        API_CONFIG,
        userSettings,
        $window,
        $location,
        environment,
        AUTHENTICATION_SETTINGS,
        applicationState) {
        let userState = {},
            accessToken,
            intervalDuration = 27000,
            intervalPromise = null;

        const state = applicationState.getStateUrlConverter().getDefaultState();
        const defaultStateUrl = applicationState.getStateUrlConverter().state2url(state);

        let unwatch = $rootScope.$watch(function () {
            return $location.search();
        }, function () {
            let params = $location.search();
            if ('a-select-server' in params && 'aselect_credentials' in params && 'rid' in params) {
                refreshTokenUser(params['a-select-server'], params['aselect_credentials'], params['rid']);
            } else {
                $rootScope.$applyAsync(function() {
                    if (!angular.isDefined(userSettings.refreshToken.value)) {
                        refreshTokenAnonymous ().then(accessTokenLoop);
                    } else {
                        accessTokenLoop();
                    }
                });
            }
        });
        $rootScope.$on('$destroy', unwatch);
        return {
            authenticate: authenticate,
            fetchToken: refreshTokenUser,
            refreshToken: accessTokenLoop,
            getStatus: getStatus,
            logOut: logOut
        };

        function authenticate () {
            // SIAM needs a callback url to be able to redirect back to the place you initiated the login from
            // The callback fails when there is no hash in the URL. So we need to add one, and recreate the default url
            // from the state. (MK)
            const hashPart = ($window.location.hash.length > 0) ? $window.location.hash : defaultStateUrl;

            const callbackUrl = encodeURIComponent(AUTHENTICATION_SETTINGS[environment.NAME].ENDPOINT + hashPart);
            const authenticationUrl = API_CONFIG.AUTH + '/siam/authenticate?callback=' + callbackUrl +
                '&active=true';

            if (!accessToken) {
                $window.location.href = authenticationUrl;
            }
        }

        function refreshTokenUser (aselectserver, aselectcredentials, rid) {
            // This will fetch a refresh token for a specific user
            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + '/siam/token',
                headers: {
                    'Content-Type': 'text/plain'
                },
                params: {
                    'aselect_credentials': params['aselect_credentials'],
                    'rid': params['rid'],
                    'a-select-server': params['a-select-server'] }
            }).then(callbackSuccess, callbackError).finally(clearLocation);

            function callbackSuccess (response) {
                userSettings.refreshToken.value = response.data;
                userState.isLoggedIn = true;
                $rootScope.$applyAsync(function() {
                    accessTokenLoop();
                });
            }

            function callbackError (response) {
                let q = $q.defer();

                switch (response.status) {
                    case 400:
                        q.reject('Verplichte parameter is niet aanwezig');
                        break;
                    case 404:
                        q.reject('Er is iets mis met de inlog server, probeer het later nog eens.');
                        break;
                    case 502:
                        q.reject('Probleem in de communicatie met de inlog server');
                        break;
                    case 504:
                        q.reject('Inlog server timeout, probeer het later nog eens.');
                        break;
                    default:
                        q.reject('Er is een fout opgetreden. Neem contact op met de beheerder en vermeld code: ' +
                            response.status + ' status: ' + response.statusText + '.');
                }

                return q.promise;
            }

        }

        function refreshTokenAnonymous () {
            // This will fetch an anonymous refresh token
            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + '/refreshtoken',
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(callbackSuccess, callbackError).finally(clearLocation);

            function callbackSuccess (response) {
                userSettings.refreshToken.value = response.data;
                userState.isLoggedIn = true;
            }

            function callbackError (response) {
                let q = $q.defer();

                switch (response.status) {
                    case 400:
                        q.reject('Verplichte parameter is niet aanwezig');
                        break;
                    case 404:
                        q.reject('Er is iets mis met de inlog server, probeer het later nog eens.');
                        break;
                    default:
                        q.reject('Er is een fout opgetreden. Neem contact op met de beheerder en vermeld code: ' +
                            response.status + ' status: ' + response.statusText + '.');
                }

                return q.promise;
            }

        }

        function clearLocation() {
            // TEMP FIX: Clear address bar location so going back doesn't log you in again
            // Will no longer be needed when a logout triggers an IdP logout
        }

        function accessTokenLoop() {
            let refreshToken = userSettings.refreshToken.value;

            return $http({
                method: 'GET',
                url: API_CONFIG.AUTH + '/accesstoken',
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': API_CONFIG.AUTHZ_HEADER_PREFIX + refreshToken
                }
            }).then(callbackSuccess, callbackError);

            function callbackSuccess (response) {
                userState.accessToken = response.data;
                userSettings.refreshToken.value = userState.accessToken;
                accessToken = response.data.token;
                userState.isLoggedIn = true;
            }

            function callbackError (response) {
                let q = $q.defer();

                switch (response.status) {
                    case 400:
                        if (angular.isDefined(response.data.non_field_errors[0])) {
                            if (response.data.non_field_errors[0] === 'Signature has expired.') {
                                logOut();
                            }
                        }
                        q.reject('Verplichte parameter is niet aanwezig');
                        break;
                    case 404:
                        q.reject('Er is iets mis met de inlog server, probeer het later nog eens.');
                        break;
                    case 502:
                        q.reject('Probleem in de communicatie met de inlog server');
                        break;
                    case 504:
                        q.reject('Inlog server timeout, probeer het later nog eens.');
                        break;
                    default:
                        q.reject('Er is een fout opgetreden. Neem contact op met de beheerder en vermeld code: ' +
                            response.status + ' status: ' + response.statusText + '.');
                }

                return q.promise;
            }
        }

        function logOut () {
            if (intervalPromise) {
                $timeout.cancel(intervalPromise);
            }
            userSettings.refreshToken.remove();

            accessToken = null;
            userState.username = null;
            userState.accessToken = null;
            userState.isLoggedIn = false;
        }

        function getStatus () {
            return userState;
        }
    }
})();
