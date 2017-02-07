(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('authentication', authenticationFactory);

    authenticationFactory.$inject = [
        '$http', '$httpParamSerializer', '$timeout', 'API_CONFIG', 'userSettings', '$window', '$location', 'environment', 'AUTHENTICATION_SETTINGS'
    ];

    function authenticationFactory ($http, $httpParamSerializer, $timeout, API_CONFIG, userSettings, $window, $location, environment, AUTHENTICATION_SETTINGS) {
        var userState = {},
            accessToken = userSettings.token.value;

        console.log('ACCESS TOKEN', accessToken);
        // if sessionStorage is available use the refreshToken function to check if a token is available and valid
        if (accessToken) {
            refreshToken();
        } else {
            userState.accessToken = null;
            userState.isLoggedIn = false;
        }

        //  Refresh the successfully obtained token every 4 and a half minutes (token expires in 5 minutes)
        const intervalDuration = 270000;

        return {
            authenticate: authenticate,
            fetchToken: fetchToken,
            refreshToken: refreshToken,
            getStatus: getStatus
        };

        function authenticate () {
            const isAuthenticated = false;
            const authenticationUrl = API_CONFIG.AUTH + '/authenticate?callback=' + callbackUrl + '&active=true';
            const callbackUrl =  encodeURIComponent(AUTHENTICATION_SETTINGS[environment.NAME].ENDPOINT + $window.location.hash);

            if (!isAuthenticated) {
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
                })
                    .then(fetchSuccess, fetchError);
            }

            function fetchSuccess (response) {
                userState.accessToken = response.data;
                userSettings.token.value = userState.accessToken;
                userState.isLoggedIn = true;
            }

            function fetchError (response) {
                console.log('ERROR', response);
            }
        }

        function refreshToken () {
            console.log('refresh called')
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
