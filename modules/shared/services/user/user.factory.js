(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('user', userFactory);

    userFactory.$inject = ['$window', '$q', '$interval', '$cacheFactory', 'userSettings'];

    function userFactory ($window, $q, $interval, $cacheFactory, userSettings) {
        const USER_TYPE = { // the possible types of a user
            NONE: 'NONE',
            AUTHENTICATED: 'AUTHENTICATED'
        };

        const AUTHORIZATION_LEVEL = { // The possible user authorization levels
            NONE: 'NONE', // unkown authorization level or authorization level not set
            DEFAULT: 'DEFAULT',
            EMPLOYEE: 'EMPLOYEE',
            EMPLOYEE_PLUS: 'EMPLOYEE_PLUS'
        };

        const AUTHORIZATION_LEVEL_MAPPING = { // maps the backend level codes upon a valid authorization level
            0: AUTHORIZATION_LEVEL.DEFAULT,
            1: AUTHORIZATION_LEVEL.EMPLOYEE,
            3: AUTHORIZATION_LEVEL.EMPLOYEE_PLUS
        };

        class User {
            constructor () {
                this.init = function () { // initialize private properties
                    this._accessToken = null;
                    this._authorizationLevel = AUTHORIZATION_LEVEL.NONE;
                    this.name = '';
                    this.scopes = '';
                };

                this.decodeToken = function (token) {
                    try {
                        return angular.fromJson(
                            $window.atob(token
                                .split('.')[1]
                                .replace('-', '+')
                                .replace('_', '/')
                            ));
                    } catch (e) {
                        return {};
                    }
                };

                // private method to parse an access token
                this.parseToken = function (token) {
                    const content = this.decodeToken(token);

                    if (angular.isDefined(content.sub)) {
                        this.name = content.sub || '';
                    }

                    if (angular.isDefined(content.authz)) {
                        this.authorizationLevel = content.authz;
                    }

                    if (angular.isDefined(content.scopes)) {
                        this.scopes = content.scopes;
                    }
                };

                this.init();

                if (this.accessToken) { // get any existing access token
                    this.parseToken(this.accessToken); // and parse its contents
                }
            }

            clear () {
                userSettings.userType.remove();

                this.init();
            }

            get accessToken () {
                return this._accessToken;
            }

            set accessToken (value) {
                this._accessToken = value;
                this.parseToken(value);
            }

            get type () {
                return USER_TYPE[userSettings.userType.value] || USER_TYPE.NONE;
            }

            set type (value) {
                userSettings.userType.value = USER_TYPE[value];
            }

            get name () {
                return this._name;
            }

            set name (value) {
                this._name = value;
            }

            get scopes () {
                return this._scopes;
            }

            set scopes (value) {
                this._scopes = value;
            }

            get authorizationLevel () {
                return AUTHORIZATION_LEVEL[this._authorizationLevel];
            }

            set authorizationLevel (value) {
                this._authorizationLevel = AUTHORIZATION_LEVEL_MAPPING[value] || AUTHORIZATION_LEVEL.NONE;
            }
        }

        const user = new User();

        return {
            getAccessToken,
            setAccessToken,
            waitForAccessToken,
            getName,
            getScopes,
            getAuthorizationLevel,
            getUserType,
            clearToken,
            meetsRequiredLevel,
            USER_TYPE,
            AUTHORIZATION_LEVEL
        };

        function getAccessToken () {
            return user.accessToken;
        }

        function setAccessToken (token) {
            const currentAuthorizationLevel = user.authorizationLevel;

            user.type = USER_TYPE.AUTHENTICATED;
            user.accessToken = token;
            clearHttpCache();
            if (!meetsRequiredLevel(currentAuthorizationLevel)) {
                onLowerAuthorizationLevel();
            }
        }

        /**
         * Returns a promise that will resolve to an access token if available.
         * When the user is in the process of logging in, the promise will not
         * be resolved until after the log in process has finished (or after a
         * maximum of 5 seconds).
         *
         * @return {Promise} The user access token or null.
         */
        function waitForAccessToken () {
            const defer = $q.defer(),
                token = getAccessToken();

            if (token) {
                defer.resolve(token);
            } else {
                defer.resolve(null);
            }

            return defer.promise;
        }

        function getUserType () {
            return user.type;
        }

        function getName () {
            return user.name;
        }

        function getScopes () {
            return user.scopes;
        }

        function getAuthorizationLevel () {
            return user.authorizationLevel;
        }

        function clearHttpCache () {
            // Clearing the cache whenever authorization level is lowered
            $cacheFactory.get('$http').removeAll();
        }

        function meetsRequiredLevel (requiredLevel) {
            if (angular.isDefined(AUTHORIZATION_LEVEL[requiredLevel])) {
                const access = Object.keys(AUTHORIZATION_LEVEL_MAPPING).reduce((result, value) => ({
                    user: user.authorizationLevel === AUTHORIZATION_LEVEL_MAPPING[value] ? value : result.user,
                    required: requiredLevel === AUTHORIZATION_LEVEL_MAPPING[value] ? value : result.required
                }), {
                    user: Number.NEGATIVE_INFINITY,
                    required: Number.NEGATIVE_INFINITY
                });
                return access.user >= access.required;
            } else {
                return angular.isUndefined(requiredLevel);
            }
        }

        function onLowerAuthorizationLevel () {
            // Brute fix to reload the application when the user authorization decreases
            $window.location.reload(true);
        }

        function clearToken () {
            user.clear();
            onLowerAuthorizationLevel();
        }
    }
})();
