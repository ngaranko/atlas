(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('user', userFactory);

    userFactory.$inject = ['$http', '$httpParamSerializer', '$q', '$interval', 'environment'];

    function userFactory ($http, $httpParamSerializer, $q, $interval, environment) {
        var userState = {};

        try {
            localStorage.setItem('test', 'testvalue');
            var data = localStorage.getItem('test');
            if (data !== 'testvalue') {
                throw new Error('getItem does not work');
            }
            localStorage.removeItem('test');

            var token = localStorage.getItem('token');

            if (token) {
                refreshToken(token);
            }
        } catch (e) {
            userState.username = null;
            userState.accessToken = null;
            userState.isLoggedIn = false;
            localStorage.removeItem('token');
        }

        //  Refresh the succesfully obtained token every 4 and a half minutes (token expires in 5 minutes)
        var intervalDuration = 270000;
        var intervalPromise = null;

        return {
            login: login,
            refreshToken: refreshToken,
            logout: logout,
            getStatus: getStatus
        };

        function login (username, password) {
            return $http({
                method: 'POST',
                url: environment.AUTH_ROOT + 'token/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer(
                    {
                        username: username,
                        password: password
                    }
                )
            })
                .then(loginSuccess, loginError);

            function loginSuccess (response) {
                // This is the username as entered by the user in the login form, backend doesn't return the username
                userState.username = username;
                userState.accessToken = response.data.token;
                userState.isLoggedIn = true;

                localStorage.setItem('token', userState.accessToken);

                intervalPromise = $interval(refreshToken(userState.accessToken), intervalDuration);
            }

            function loginError (response) {
                var q = $q.defer();

                switch (response.status) {
                    case 400:
                    case 401:
                        q.reject('De combinatie gebruikersnaam en wachtwoord wordt niet herkend.');
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

        function refreshToken (accessToken) {
            return $http({
                method: 'POST',
                url: environment.AUTH_ROOT + 'refresh/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer(
                    {
                        token: accessToken
                    }
                    )
            })
                .then(refreshSuccess, logout);

            function refreshSuccess (response) {
                userState.accessToken = response.data.token;
                userState.isLoggedIn = true;
            }
        }

        function logout () {
            if (intervalPromise) {
                $interval.cancel(intervalPromise);
            }
            userState.username = null;
            userState.accessToken = null;
            userState.isLoggedIn = false;
            localStorage.removeItem('token');
        }

        function getStatus () {
            return userState;
        }
    }
})();
