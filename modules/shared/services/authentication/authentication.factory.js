(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('authentication', authenticationFactory);

    authenticationFactory.$inject = [
        '$q',
        '$http',
        '$httpParamSerializer',
        '$timeout',
        'API_CONFIG',
        'userSettings',
        '$window',
        '$location',
        'environment',
        'AUTHENTICATION_SETTINGS'
    ];

    function authenticationFactory (
        $q,
        $http,
        $httpParamSerializer,
        $timeout,
        API_CONFIG,
        userSettings,
        $window,
        $location,
        environment,
        AUTHENTICATION_SETTINGS) {
        var userState = {},
            accessToken = userSettings.token.value;

        // if sessionStorage is available use the refreshToken function to check if a token is available and valid
        if (accessToken) {
            // sim refresh. But is not supported yet, this just fills userState with userSettings
            refreshToken();
        } else {
            userState.accessToken = null;
            userState.isLoggedIn = false;
        }

        var intervalDuration = 270000;
        var intervalPromise = null;

        console.log('USERSTATE', userState.accessToken);
        console.log('ACCESSTOK', accessToken);

        return {
            authenticate: authenticate,
            fetchToken: fetchToken,
            refreshToken: refreshToken,
            getStatus: getStatus
        };

        function authenticate () {
            // callback fails when there is no hash in de callbackUrl. Add one if needed.
            const hashPart = ($window.location.hash.length > 0) ? $window.location.hash : '#';

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
                }).then(fetchSuccess, fetchError);

            }

            function fetchSuccess (response) {

                userState.accessToken = response.data;
                userSettings.token.value = userState.accessToken;
                userState.isLoggedIn = true;
                accessToken = response.data;

                intervalPromise = $timeout(refreshToken, intervalDuration);
            }

            function fetchError (response) {
                var q = $q.defer();
                console.log('error', response);
                switch (response.status) {
                    case 400:
                        q.reject('Verplichte parameter is niet aanwezig')
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

        function refreshToken () {
            console.log('refresh called', userSettings);

            //userState.accessToken = null;
            //userState.isLoggedIn = false;
            // return $http({
            //     method: 'POST',
            //     url: API_CONFIG.AUTH + 'refresh/',
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     data: $httpParamSerializer(
            //         {
            //             token: accessToken
            //         }
            //         )
            // })
            //     .then(refreshSuccess, refreshError);
            //
            // function refreshSuccess (response) {
            //     userState.accessToken = response.data;
            //     userSettings.token.value = userState.accessToken;
            //     accessToken = response.data.token;
            //     userState.isLoggedIn = true;
            //
            //     intervalPromise = $timeout(refreshToken, intervalDuration);
            // }
            //
            // function refreshError (error) {
            //     console.log('ERROR', error);
            // }
        }

        function getStatus () {
            return userState;
        }
    }
})();
