
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
            // Fetch authentication token
            if (angular.isDefined($location.search().rid)) {
                fetchToken(userSettings.token.value);
            } else {
                $rootScope.$applyAsync(function() {
                    if (angular.isDefined(userSettings.token.value)) {
                        refreshToken(userSettings.token.value);
                    }
                });
            }
        });
        $rootScope.$on('$destroy', unwatch);
        return {
            authenticate: authenticate,
            fetchToken: fetchToken,
            refreshToken: refreshToken,
            getStatus: getStatus,
            logOut: logOut
        };

        function authenticate () {
            // SIAM needs a callback url to be able to redirect back to the place you initiated the login from
            // The callback fails when there is no hash in the URL. So we need to add one, and recreate the default url
            // from the state.
            const hashPart = ($window.location.hash.length > 0) ? $window.location.hash : defaultStateUrl;

            const callbackUrl = encodeURIComponent(AUTHENTICATION_SETTINGS[environment.NAME].ENDPOINT + hashPart);
            const authenticationUrl = API_CONFIG.AUTH + '/authenticate?callback=' + callbackUrl +
                '&active=true';

            if (!accessToken) {
                $window.location.href = authenticationUrl;
            }
        }

        function fetchToken () {
            let params = $location.search();

            if (angular.isDefined(params.rid)) {
                let data = {
                    'aselect_credentials': params.aselect_credentials,
                    'rid': params.rid,
                    'a-select-server': params['a-select-server'] };

                return $http({
                    method: 'GET',
                    url: API_CONFIG.AUTH + '/token',
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    params: data
                }).then(fetchSuccess, fetchError).finally(clearLocation);
            }

            function fetchSuccess (response) {
                userState.accessToken = response.data;
                userSettings.token.value = response.data;
                userState.isLoggedIn = true;
                accessToken = response.data;

                intervalPromise = $timeout(refreshToken(response.data), intervalDuration);
            }

            function fetchError (response) {
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

            function clearLocation () {
                // URL Needs to be sanitized
            }
        }

        function refreshToken (token) {
            accessToken = token;

            return $http({
                method: 'POST',
                url: API_CONFIG.REFRESH + 'refresh/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({ token: accessToken })
            }).then(refreshSuccess, refreshError);

            function refreshSuccess (response) {
                userState.accessToken = response.data;
                userSettings.token.value = userState.accessToken;
                accessToken = response.data.token;
                userState.isLoggedIn = true;
            }

            function refreshError (response) {
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
            userSettings.token.remove();

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
