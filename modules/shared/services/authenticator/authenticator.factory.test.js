describe(' The authenticator factory', function () {
    let $window,
        $location,
        storage,
        authenticator,
        httpStatus,
        Raven,
        absUrl,
        uriStripper,
        callbackParams,
        stateToken,
        accessToken,
        name,
        scopes,
        accessTokenParser,
        stateTokenGenerator,
        queryStringParser;

    const SCOPES = 'BRK%2FRS%20BRK%2FRSN%20BRK%2FRO%20WKPB%2FRBDU%20MON%2FRBC%20MON%2FRDM%20HR%2FR';
    const AUTH_PATH = 'oauth2/authorize?idp_id=datapunt&response_type=token&client_id=citydata' +
        `&scope=${SCOPES}`;

    beforeEach(function () {
        absUrl = 'absUrl';

        accessTokenParser = jasmine.createSpy().and.callFake(() => ({ name, scopes }));
        stateTokenGenerator = jasmine.createSpy();
        queryStringParser = jasmine.createSpy();

        angular.mock.module(
            'dpShared',
            {
                accessTokenParser,
                stateTokenGenerator,
                queryStringParser,
                $window: {
                    addEventListener: angular.noop,
                    location: {
                        href: '',
                        reload: angular.noop
                    },
                    crypto: {
                        getRandomValues: (list) => {
                            list[0] = 48; // 0
                            list[1] = 52; // 4
                            list[2] = 56; // 8
                            list[3] = 62; // >
                            list[4] = 73; // I
                            list[5] = 89; // Y
                            list[6] = 99; // c
                            list[7] = 101; // e
                            list[8] = 105; // i
                            list[9] = 118; // v
                            list[10] = 123; // {
                            list[11] = 200; // È
                            list[12] = 204; // Ì
                            list[13] = 208; // Ð
                            list[14] = 224; // à
                            list[15] = 240; // ð
                        }
                    },
                    btoa: angular.noop,
                    encodeURIComponent: angular.noop
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
                uriStripper: jasmine.createSpyObj('uriStripper', ['stripDomain']),
                httpStatus: {
                    registerError: angular.noop,
                    LOGIN_ERROR: 'LOGIN_ERROR'
                }
            }
        );

        callbackParams = '{"one": 1}';
        stateToken = 'randomString';

        angular.mock.inject(function (
            _$window_,
            _$location_,
            _$interval_,
            _storage_,
            _authenticator_,
            _uriStripper_,
            _httpStatus_,
            _Raven_
        ) {
            $window = _$window_;
            $location = _$location_;
            storage = _storage_;
            authenticator = _authenticator_;
            uriStripper = _uriStripper_;
            httpStatus = _httpStatus_;
            Raven = _Raven_;
        });

        spyOn($window.location, 'reload').and.returnValue(null);
        spyOn($location, 'search').and.returnValue({});
        spyOn($location, 'replace');
    });

    describe('initialization', () => {
        describe('access token', () => {
            it('restores when saved in session storage', () => {
                name = 'testUser';
                scopes = ['SCOPE/1', 'SCOPE/2'];
                accessToken = 'myToken';

                authenticator.initialize();

                expect(accessTokenParser).toHaveBeenCalledWith(accessToken);
                expect(authenticator.getName()).toBe(name);
                expect(authenticator.getScopes()).toEqual(scopes);
            });

            it('does not restore when not in session storage', () => {
                accessToken = undefined;

                authenticator.initialize();

                expect(accessTokenParser).not.toHaveBeenCalled();
                expect(authenticator.getName()).toBe('');
                expect(authenticator.getScopes()).toEqual([]);
            });
        });

        describe('success', () => {
            let queryString;
            let queryObject;

            beforeEach(() => {
                spyOn(storage.session, 'setItem');
                spyOn(storage.session, 'removeItem');

                queryString = `?state=${stateToken}&access_token=accesstoken&token_type=bearer&expires_in=36000`;
                queryObject = {
                    state: stateToken,
                    access_token: 'accesstoken',
                    token_type: 'bearer',
                    expires_in: '36000'
                };

                spyOn($location, 'url').and.callFake(() => queryString);
                queryStringParser.and.callFake(() => queryObject);
            });

            it('is able to intercept callback messages from external security provider, clears browser history', () => {
                authenticator.initialize();

                expect(queryStringParser).toHaveBeenCalledWith(queryString);
                expect(accessTokenParser).toHaveBeenCalledWith(queryObject.access_token);
                expect($location.replace).toHaveBeenCalled();
                expect($location.url).toHaveBeenCalledWith('');
                expect($location.search).toHaveBeenCalledWith({one: 1});
                expect(storage.session.setItem).toHaveBeenCalledWith('accessToken', queryObject.access_token);
                expect(storage.session.removeItem).toHaveBeenCalledWith('stateToken');
                expect(storage.session.removeItem).toHaveBeenCalledWith('callbackParams');
            });

            it('stays at home page when no saved callback path can be found', function () {
                callbackParams = null;

                authenticator.initialize();

                expect($location.replace).not.toHaveBeenCalled();
                expect($location.url).not.toHaveBeenCalledWith('');
                expect($location.search).not.toHaveBeenCalled();
                expect(storage.session.setItem).toHaveBeenCalledWith('accessToken', queryObject.access_token);
                expect(storage.session.removeItem).toHaveBeenCalledWith('stateToken');
            });

            describe('validating callback urls', function () {
                describe('with the correct state token', () => {
                    it('rejects state token only', () => {
                        queryString = `?state=${stateToken}`;
                        queryObject = { state: stateToken };
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                    it('rejects state token only, with other params', () => {
                        queryString = `?state=${stateToken}&one=1&two=2`;
                        queryObject = { state: stateToken, one: 1, two: 2 };
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                    it('accepts with all params', () => {
                        queryString = `?state=${stateToken}&access_token=accesstoken&token_type=bearer` +
                            '&expires_in=36000';
                        authenticator.initialize();
                        expect(storage.session.setItem).toHaveBeenCalledWith('accessToken', queryObject.access_token);
                    });
                    it('accepts with all params, and other params', () => {
                        queryString = `?state=${stateToken}&access_token=accesstoken&token_type=bearer` +
                            '&expires_in=36000&one=1&two=2';
                        queryObject = {
                            state: stateToken,
                            access_token: 'accesstoken',
                            token_type: 'bearer',
                            expires_in: '36000',
                            one: 1,
                            two: 2
                        };
                        authenticator.initialize();
                        expect(storage.session.setItem).toHaveBeenCalledWith('accessToken', queryObject.access_token);
                    });
                });

                describe('with an incorrect state token', () => {
                    beforeEach(() => {
                        spyOn(Raven, 'captureMessage');
                    });

                    it('rejects state token only', () => {
                        queryString = '?state=invalid';
                        queryObject = { state: 'invalid' };
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                    it('rejects state token only, with other params', () => {
                        queryString = '?state=invalid&one=1&two=2';
                        queryObject = { state: 'invalid', one: 1, two: 2 };
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                    it('rejects with all params', () => {
                        queryString = '?state=invalid&access_token=accesstoken&token_type=bearer&expires_in=36000';
                        queryObject = {
                            state: 'invalid',
                            access_token: 'accesstoken',
                            token_type: 'bearer',
                            expires_in: '36000'
                        };
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                    it('rejects with all params, and other params', () => {
                        queryString = '?state=invalid&access_token=accesstoken&token_type=bearer&expires_in=36000' +
                            '&one=1&two=2';
                        queryObject = {
                            state: 'invalid',
                            access_token: 'accesstoken',
                            token_type: 'bearer',
                            expires_in: '36000',
                            one: 1,
                            two: 2
                        };
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                    it('Logs to sentry', () => {
                        queryString = '?state=invalid&access_token=accesstoken&token_type=bearer&expires_in=36000';
                        queryObject = {
                            state: 'invalid',
                            access_token: 'accesstoken',
                            token_type: 'bearer',
                            expires_in: '36000'
                        };
                        authenticator.initialize();
                        expect(Raven.captureMessage).toHaveBeenCalledWith(
                            new Error('Authenticator encountered an invalid state token (invalid)'));
                    });
                });

                describe('without a state token', () => {
                    it('rejects without any params', () => {
                        queryString = '';
                        queryObject = {};
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                    it('rejects with only other params', () => {
                        queryString = '?one=1&two=2';
                        queryObject = { one: 1, two: 2 };
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                    it('rejects with all params', () => {
                        queryString = '?access_token=accesstoken&token_type=bearer&expires_in=36000';
                        queryObject = {
                            access_token: 'accesstoken',
                            token_type: 'bearer',
                            expires_in: '36000'
                        };
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                    it('rejects with all params, and other params', () => {
                        queryString = '?access_token=accesstoken&token_type=bearer&expires_in=36000&one=1&two=2';
                        queryObject = {
                            access_token: 'accesstoken',
                            token_type: 'bearer',
                            expires_in: '36000',
                            one: 1,
                            two: 2
                        };
                        authenticator.initialize();
                        expect(storage.session.setItem).not.toHaveBeenCalled();
                    });
                });
            });
        });

        describe('errored', () => {
            let queryString;
            let queryObject;

            beforeEach(() => {
                queryString = '?error=invalid_request&error_description=invalid%20request';
                queryObject = {
                    error: 'invalid_request',
                    error_description: 'invalid request'
                };
                queryStringParser.and.returnValue(queryObject);

                $window.location.search = queryString;
                queryStringParser.and.callFake(() => queryObject);
                spyOn($location, 'url').and.callFake(() => queryString);
                spyOn(storage.session, 'removeItem');
                spyOn(Raven, 'captureMessage');
            });

            it('picks up error parameters in the query string', () => {
                authenticator.initialize();

                expect(Raven.captureMessage).toHaveBeenCalledWith(new Error(
                    'Authorization service responded with error invalid_request [invalid request] (The request is ' +
                    'missing a required parameter, includes an invalid parameter value, includes a parameter more ' +
                    'than once, or is otherwise malformed.)'));
                expect(storage.session.removeItem).toHaveBeenCalledWith('stateToken');
                expect(storage.session.removeItem).toHaveBeenCalledWith('callbackParams');
                expect(queryStringParser).toHaveBeenCalledWith(queryString);
                expect($location.replace).toHaveBeenCalled();
                expect($location.url).toHaveBeenCalledWith('');
                expect($location.search).toHaveBeenCalledWith({ one: 1 });
            });

            it('works without callback', () => {
                callbackParams = '';

                authenticator.initialize();

                expect(Raven.captureMessage).toHaveBeenCalledWith(new Error(
                    'Authorization service responded with error invalid_request [invalid request] (The request is ' +
                    'missing a required parameter, includes an invalid parameter value, includes a parameter more ' +
                    'than once, or is otherwise malformed.)'));
                expect(storage.session.removeItem).toHaveBeenCalledWith('stateToken');
                expect(storage.session.removeItem).toHaveBeenCalledWith('callbackParams');
                expect($location.search).toHaveBeenCalledWith({});
            });

            it('does not catch an error when not in query string', () => {
                queryString = '?something=else';
                queryObject = { something: 'else' };
                $window.location.search = queryString;

                authenticator.initialize();

                expect(Raven.captureMessage).not.toHaveBeenCalled();
                expect(storage.session.removeItem).not.toHaveBeenCalled();
                expect($location.replace).not.toHaveBeenCalled();
                expect($location.search).not.toHaveBeenCalled();
            });

            it('does not catch an error without query string', () => {
                queryString = '';
                queryObject = {};
                $window.location.search = queryString;

                authenticator.initialize();

                expect(Raven.captureMessage).not.toHaveBeenCalled();
                expect(storage.session.removeItem).not.toHaveBeenCalled();
                expect($location.replace).not.toHaveBeenCalled();
                expect($location.search).not.toHaveBeenCalled();
            });
        });
    });

    describe('login', () => {
        const randomString = 'abcd+efgh==';
        const encodedRandomString = 'abcd%2Befgh%3D%3D';
        beforeEach(() => {
            stateTokenGenerator.and.returnValue('abcd+efgh==');
            spyOn($window, 'encodeURIComponent').and.returnValue(encodedRandomString);
        });

        it('registers an http error when the crypto library is not available', () => {
            spyOn(httpStatus, 'registerError');
            spyOn(storage.session, 'setItem');
            stateTokenGenerator.and.returnValue('');
            $window.encodeURIComponent.and.returnValue('');

            authenticator.login();

            expect($window.encodeURIComponent).toHaveBeenCalledWith('');
            expect(httpStatus.registerError).toHaveBeenCalledWith('LOGIN_ERROR');
            expect($window.location.href).toBe('');
            expect(storage.session.setItem).not.toHaveBeenCalled();
        });

        it('it generates a random string of characters and url encodes it', () => {
            spyOn(httpStatus, 'registerError');
            authenticator.login();
            expect($window.encodeURIComponent).toHaveBeenCalledWith('abcd+efgh==');
            expect(httpStatus.registerError).not.toHaveBeenCalled();
        });

        it('can login a user by redirecting to an external security provider', function () {
            absUrl = 'absUrl/#?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl/')}`);
        });

        it('saves the current path in the session when redirecting to an external security provider', function () {
            spyOn(storage.session, 'setItem');
            $location.search.and.returnValue({one: 1});
            absUrl = 'absUrl/#?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl/')}`);
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
            expect(storage.session.setItem).toHaveBeenCalledWith('stateToken', randomString);
        });

        it('removes everything after # if present', function () {
            absUrl = 'absUrl/#/?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl/')}`);

            absUrl = 'absUrl/#/arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl/')}`);

            absUrl = 'absUrl/#arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl/')}`);

            absUrl = 'absUrl/#?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl/')}`);

            absUrl = 'absUrl#/?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl#/arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl#?arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl#arg';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl#';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl')}`);

            absUrl = 'absUrl';
            authenticator.login();
            expect($window.location.href)
                .toBe(AUTH_PATH +
                    `&state=${encodedRandomString}&redirect_uri=${encodeURIComponent('absUrl')}`);
        });
    });

    it('can logout a user by clearing the access token and reload', function () {
        spyOn(storage.session, 'removeItem');

        authenticator.logout();
        expect(storage.session.removeItem).toHaveBeenCalledWith('accessToken');
        expect($window.location.reload).toHaveBeenCalledWith(true);
    });
});
