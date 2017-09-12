describe(' The authenticator factory', function () {
    let $httpBackend,
        $window,
        $location,
        storage,
        user,
        authenticator,
        absUrl,
        mockedUser,
        uriStripper,
        callbackParams,
        stateToken,
        accessToken;

    const AUTH_PATH = 'oauth2/';
    const LOGIN_PATH = 'authorize?idp_id=datapunt&response_type=token&client_id=citydata-data.amsterdam.nl';

    beforeEach(function () {
        absUrl = 'absUrl';

        const initUser = {
            refreshToken: null,
            accessToken: null,
            userType: 'NONE'
        };

        mockedUser = initUser;

        angular.mock.module(
            'dpShared',
            {
                user: {
                    setRefreshToken: (token, type) => {
                        mockedUser.refreshToken = token;
                        mockedUser.userType = type;
                    },
                    setAccessToken: (token) => mockedUser.accessToken = token,
                    getRefreshToken: () => mockedUser.refreshToken,
                    clearToken: () => mockedUser = initUser,
                    getUserType: () => mockedUser.userType,
                    USER_TYPE: {
                        NONE: 'NONE',
                        ANONYMOUS: 'ANONYMOUS',
                        AUTHENTICATED: 'AUTHENTICATED'
                    }
                },
                $window: {
                    addEventListener: angular.noop,
                    location: {
                        href: ''
                    }
                },
                $location: {
                    absUrl: () => absUrl,
                    replace: angular.noop,
                    search: angular.noop
                },
                sharedConfig: {
                    API_ROOT: '',
                    AUTH_HEADER_PREFIX: 'Bearer '
                },
                storage: {
                    session: {
                        setItem: (key, value) => {
                            if (key === 'stateToken') {
                                stateToken = value;
                            }
                        },
                        getItem: (key) => {
                            switch (key) {
                                case 'callbackParams':
                                    return callbackParams;
                                case 'stateToken':
                                    return stateToken;
                                case 'accessToken':
                                    return accessToken;
                            }
                        },
                        removeItem: angular.noop
                    }
                },
                uriStripper: jasmine.createSpyObj('uriStripper', ['stripDomain'])
            }
        );

        callbackParams = {one: 1};
        stateToken = 'randomString';

        angular.mock.inject(function (
            _$httpBackend_,
            _$window_,
            _$location_,
            _$interval_,
            _storage_,
            _user_,
            _authenticator_,
            _uriStripper_
        ) {
            $httpBackend = _$httpBackend_;
            $window = _$window_;
            $location = _$location_;
            storage = _storage_;
            user = _user_;
            authenticator = _authenticator_;
            uriStripper = _uriStripper_;
        });

        spyOn($location, 'search').and.returnValue({});
        spyOn($location, 'replace');
    });

    describe('initialization', () => {
        describe('access token', () => {
            it('restores when saved in session storage', () => {
                accessToken = 'myToken';
                spyOn(user, 'setAccessToken');

                authenticator.initialize();

                expect(user.setAccessToken).toHaveBeenCalledWith('myToken');
            });

            it('does not restore when not in session storage', () => {
                accessToken = null;
                spyOn(user, 'setAccessToken');

                authenticator.initialize();

                expect(user.setAccessToken).not.toHaveBeenCalledWith();
            });
        });

        describe('errored', () => {
            it('picks up error parameters in the query string', () => {
                spyOn(storage.session, 'removeItem');
                $window.location.search = '?error=invalid_request&error_description=invalid%20request';

                authenticator.initialize();

                expect(authenticator.error).toEqual({
                    message: 'The request is missing a required parameter, includes an invalid parameter value, ' +
                        'includes a parameter more than once, or is otherwise malformed.',
                    code: 'invalid_request',
                    description: 'invalid request'
                });
                expect(storage.session.removeItem).toHaveBeenCalledWith('stateToken');
                expect(storage.session.removeItem).toHaveBeenCalledWith('callbackParams');
                expect($location.replace).toHaveBeenCalled();
                expect($location.search).toHaveBeenCalledWith({ one: 1, error: 'T' });
            });

            it('works without callback', () => {
                spyOn(storage.session, 'removeItem');
                callbackParams = '';
                $window.location.search = '?error=invalid_request&error_description=invalid%20request';

                authenticator.initialize();

                expect(authenticator.error).toEqual({
                    message: 'The request is missing a required parameter, includes an invalid parameter value, ' +
                        'includes a parameter more than once, or is otherwise malformed.',
                    code: 'invalid_request',
                    description: 'invalid request'
                });
                expect(storage.session.removeItem).toHaveBeenCalledWith('stateToken');
                expect(storage.session.removeItem).toHaveBeenCalledWith('callbackParams');
                expect($location.replace).toHaveBeenCalled();
                expect($location.search).toHaveBeenCalledWith({ error: 'T' });
            });

            it('does not catch an error when not in query string', () => {
                spyOn(storage.session, 'removeItem');
                $window.location.search = '?something=else';

                authenticator.initialize();

                expect(authenticator.error).toEqual({
                    message: '',
                    code: '',
                    description: ''
                });
                expect(storage.session.removeItem).not.toHaveBeenCalled();
                expect($location.replace).not.toHaveBeenCalled();
                expect($location.search).not.toHaveBeenCalled();
            });

            it('does not catch an error without query string', () => {
                spyOn(storage.session, 'removeItem');
                $window.location.search = '';

                authenticator.initialize();

                expect(authenticator.error).toEqual({
                    message: '',
                    code: '',
                    description: ''
                });
                expect(storage.session.removeItem).not.toHaveBeenCalled();
                expect($location.replace).not.toHaveBeenCalled();
                expect($location.search).not.toHaveBeenCalled();
            });
        });
    });

    describe('login', () => {
        it('can login a user by redirecting to an external security provider', function () {
            absUrl = 'absUrl/#?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl/')}`);
        });

        it('saves the current path in the session when redirecting to an external security provider', function () {
            spyOn(storage.session, 'setItem');
            $location.search.and.returnValue({one: 1});
            absUrl = 'absUrl/#?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl/')}`);
            expect(storage.session.setItem).toHaveBeenCalledWith('callbackParams', angular.toJson({one: 1}));
        });

        it('saves the current path in the session removing the protocol and domain', function () {
            spyOn(storage.session, 'setItem');
            const path = 'foo/bar';
            const dte = 'https://api.data.amsterdam.nl' + path;
            $location.search.and.returnValue({dte});
            uriStripper.stripDomain.and.returnValue(path);

            authenticator.login();

            expect(uriStripper.stripDomain).toHaveBeenCalledWith(dte);
            expect(storage.session.setItem).toHaveBeenCalledWith('callbackParams', angular.toJson({dte: path}));
        });

        it('removes everything after # if present', function () {
            absUrl = 'absUrl/#/?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl/')}`);

            absUrl = 'absUrl/#/arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl/')}`);

            absUrl = 'absUrl/#arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl/')}`);

            absUrl = 'absUrl/#?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl/')}`);

            absUrl = 'absUrl#/?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl#/arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl#?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl#arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl#';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH + LOGIN_PATH +
                    `&state=randomString&redirect_uri=${encodeURIComponent('absUrl')}`);
        });
    });

    it('can logout a user by clearing its tokens', function () {
        spyOn(user, 'clearToken');

        authenticator.logout();
        expect(user.clearToken).toHaveBeenCalled();
    });

    it('is able to tell whether a url is a callback message from an external security provider', function () {
        authenticator.login();

        // With the correct state token
        expect(authenticator.isCallback({state: stateToken})).toBe(false);
        expect(authenticator.isCallback({state: stateToken, one: 1, two: 2})).toBe(false);
        expect(authenticator.isCallback({state: stateToken, access_token: 1, token_type: 2, expires_in: 3})).toBe(true);
        expect(authenticator.isCallback({state: stateToken, access_token: 2, rid: 3})).toBe(false);
        expect(authenticator.isCallback({state: stateToken, zero: 0, access_token: 1, token_type: 2, expires_in: 3}))
            .toBe(true);

        // With an incorrect state token
        expect(authenticator.isCallback({state: 'invalid'})).toBe(false);
        expect(authenticator.isCallback({state: 'invalid', one: 1, two: 2})).toBe(false);
        expect(authenticator.isCallback({state: 'invalid', access_token: 1, token_type: 2, expires_in: 3})).toBe(false);
        expect(authenticator.isCallback({state: 'invalid', access_token: 2, rid: 3})).toBe(false);
        expect(authenticator.isCallback({state: 'invalid', zero: 0, access_token: 1, token_type: 2, expires_in: 3}))
            .toBe(false);

        // Without a state token
        expect(authenticator.isCallback({})).toBe(false);
        expect(authenticator.isCallback({one: 1, two: 2})).toBe(false);
        expect(authenticator.isCallback({access_token: 1, token_type: 2, expires_in: 3})).toBe(false);
        expect(authenticator.isCallback({access_token: 2, rid: 3})).toBe(false);
        expect(authenticator.isCallback({zero: 0, access_token: 1, token_type: 2, expires_in: 3})).toBe(false);
    });

    it('is able to intercept callback messages from external security provider, clears browser history', function () {
        spyOn(user, 'setAccessToken');

        authenticator.login();
        $location.search.calls.reset();

        authenticator.handleCallback({
            state: stateToken,
            access_token: 'accesstoken',
            token_type: 'bearer',
            expires_in: 36000
        });

        expect($location.replace).toHaveBeenCalled();
        expect($location.search).toHaveBeenCalledWith({one: 1});
        expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');
    });

    xit('returns to the saved callback path on a refresh token error', function () {
        spyOn(storage.session, 'getItem').and.returnValue(angular.toJson({one: 1}));

        $httpBackend.whenGET(AUTH_PATH + REFRESH_TOKEN_PATH + '?a-select-server=1&aselect_credentials=2&rid=3')
            .respond(400, 'refresh token error');

        authenticator.handleCallback({one: 1, 'a-select-server': 1, 'aselect_credentials': 2, 'rid': 3});
        $httpBackend.flush();

        expect($location.replace).toHaveBeenCalled();
        expect($location.search).toHaveBeenCalledWith({one: 1});
        $httpBackend.verifyNoOutstandingRequest();
    });

    xit('returns to the saved callback path on an access token error', function () {
        spyOn(storage.session, 'getItem').and.returnValue(angular.toJson({one: 1}));

        $httpBackend.whenGET(AUTH_PATH + REFRESH_TOKEN_PATH + '?a-select-server=1&aselect_credentials=2&rid=3')
            .respond('token');
        $httpBackend.whenGET(AUTH_PATH + ACCESS_TOKEN_PATH).respond(400, 'accesstoken error');

        authenticator.handleCallback({one: 1, 'a-select-server': 1, 'aselect_credentials': 2, 'rid': 3});
        $httpBackend.flush();

        expect($location.replace).toHaveBeenCalled();
        expect($location.search).toHaveBeenCalledWith({one: 1});
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('stays at home page when no saved callback path can be found', function () {
        callbackParams = null;

        authenticator.login();
        $location.search.calls.reset();

        authenticator.handleCallback({
            state: stateToken,
            access_token: 'accesstoken',
            token_type: 'bearer',
            expires_in: 36000
        });

        expect($location.search).not.toHaveBeenCalled();
    });
});
