describe(' The authenticator factory', function () {
    let $window,
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
                    url: angular.noop,
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

        callbackParams = '{"one": 1}';
        stateToken = 'randomString';

        angular.mock.inject(function (
            _$window_,
            _$location_,
            _$interval_,
            _storage_,
            _user_,
            _authenticator_,
            _uriStripper_
        ) {
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

        describe('success', () => {
            it('is able to intercept callback messages from external security provider, clears browser history', () => {
                spyOn(user, 'setAccessToken');
                spyOn($location, 'url').and.returnValue(
                    `?state=${stateToken}&access_token=accesstoken&token_type=bearer&expires_in=36000`);

                authenticator.initialize();

                expect($location.replace).toHaveBeenCalled();
                expect($location.url).toHaveBeenCalledWith('');
                expect($location.search).toHaveBeenCalledWith({one: 1});
                expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');
            });

            it('stays at home page when no saved callback path can be found', function () {
                callbackParams = null;

                spyOn(user, 'setAccessToken');
                spyOn($location, 'url').and.returnValue(
                    `?state=${stateToken}&access_token=accesstoken&token_type=bearer&expires_in=36000`);

                authenticator.initialize();

                expect($location.replace).not.toHaveBeenCalled();
                expect($location.url).not.toHaveBeenCalledWith('');
                expect($location.search).not.toHaveBeenCalled();
                expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');
            });

            describe('validating callback urls', function () {
                let url;

                beforeEach(() => {
                    spyOn(user, 'setAccessToken');
                    spyOn($location, 'url').and.callFake(() => url);
                });

                describe('with the correct state token', () => {
                    it('rejects state token only', () => {
                        url = `?state=${stateToken}`;
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                    it('rejects state token only, with other params', () => {
                        url = `?state=${stateToken}&one=1&two=2`;
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                    it('accepts with all params', () => {
                        url = `?state=${stateToken}&access_token=accesstoken&token_type=bearer&expires_in=36000`;
                        authenticator.initialize();
                        expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');
                    });
                    it('accepts with all params, and other params', () => {
                        url = `?state=${stateToken}&access_token=accesstoken&token_type=bearer&expires_in=36000` +
                            '&one=1&two=2';
                        authenticator.initialize();
                        expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');
                    });
                });

                describe('with an incorrect state token', () => {
                    it('rejects state token only', () => {
                        url = '?state=invalid';
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                    it('rejects state token only, with other params', () => {
                        url = '?state=invalid&one=1&two=2';
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                    it('rejects with all params', () => {
                        url = '?state=invalid&access_token=accesstoken&token_type=bearer&expires_in=36000';
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                    it('rejects with all params, and other params', () => {
                        url = '?state=invalid&access_token=accesstoken&token_type=bearer&expires_in=36000' +
                            '&one=1&two=2';
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                });

                describe('without a state token', () => {
                    it('rejects without any params', () => {
                        url = '';
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                    it('rejects with only other params', () => {
                        url = '?one=1&two=2';
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                    it('rejects with all params', () => {
                        url = '?access_token=accesstoken&token_type=bearer&expires_in=36000';
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                    it('rejects with all params, and other params', () => {
                        url = '?access_token=accesstoken&token_type=bearer&expires_in=36000' +
                            '&one=1&two=2';
                        authenticator.initialize();
                        expect(user.setAccessToken).not.toHaveBeenCalled();
                    });
                });
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

        it('saves the state token in the session when redirecting to an external security provider', function () {
            spyOn(storage.session, 'setItem');
            absUrl = 'absUrl/#?arg';
            authenticator.login();
            expect(storage.session.setItem).toHaveBeenCalledWith('stateToken', 'randomString');
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
});
