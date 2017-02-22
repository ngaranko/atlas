describe(' The authenticator factory', function () {
    let $httpBackend,
        $window,
        $location,
        $interval,
        API_CONFIG,
        user,
        authenticator,
        absUrl,
        mockedUser;

    const REFRESH_INTERVAL = 1000 * 60 * 5;

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
                }
            }
        );

        angular.mock.inject(function (
            _$httpBackend_,
            _$window_,
            _$location_,
            _$interval_,
            _API_CONFIG_,
            _user_,
            _authenticator_) {
            $httpBackend = _$httpBackend_;
            $window = _$window_;
            $location = _$location_;
            $interval = _$interval_;
            API_CONFIG = _API_CONFIG_;
            user = _user_;
            authenticator = _authenticator_;
        });
    });

    it('requests a accesstoken if a refresh token is available', function () {
        spyOn(user, 'getRefreshToken').and.returnValue('token');
        spyOn(user, 'setAccessToken');

        $httpBackend.whenGET(API_CONFIG.AUTH + '/accesstoken').respond('token');

        authenticator.initialize();
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
        expect(user.setAccessToken).toHaveBeenCalledWith('token');
    });

    it('requests an anonymous refreshtoken when no refresh token is available', function () {
        spyOn(user, 'getRefreshToken').and.returnValue(null);
        spyOn(user, 'setRefreshToken');
        spyOn(user, 'setAccessToken');

        $httpBackend.whenGET(API_CONFIG.AUTH + '/refreshtoken').respond('refreshtoken');
        $httpBackend.whenGET(API_CONFIG.AUTH + '/accesstoken').respond('accesstoken');

        authenticator.initialize();
        $httpBackend.flush();
        expect(user.setRefreshToken).toHaveBeenCalledWith('refreshtoken', user.USER_TYPE.ANONYMOUS);
        expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');

        $httpBackend.verifyNoOutstandingRequest();
    });

    it('keeps retrying an anonymous refreshtoken on error', function () {
        spyOn(user, 'getRefreshToken').and.returnValue(null);
        spyOn(user, 'setRefreshToken');
        spyOn(user, 'clearToken');

        $httpBackend.whenGET(API_CONFIG.AUTH + '/refreshtoken').respond(499);

        authenticator.initialize();
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
        expect(user.clearToken).toHaveBeenCalledWith();
        expect(authenticator.error.message).toContain('Er is een fout opgetreden');
    });

    it('tries to get an anonymous refreshtoken on accesstoken error', function () {
        spyOn(user, 'getRefreshToken').and.returnValue('token');
        spyOn(user, 'setRefreshToken');
        spyOn(user, 'clearToken');

        $httpBackend.whenGET(API_CONFIG.AUTH + '/refreshtoken').respond('token');
        $httpBackend.whenGET(API_CONFIG.AUTH + '/accesstoken').respond(499, 'error message');

        authenticator.initialize();
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
        expect(user.clearToken).toHaveBeenCalledWith();

        $interval.flush(REFRESH_INTERVAL);
        $httpBackend.flush();
        expect(user.setRefreshToken).toHaveBeenCalledWith('token', user.USER_TYPE.ANONYMOUS);
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('can login a user by redirecting to an external security provider', function () {
        authenticator.login();
        expect($window.location.href)
            .toBe(API_CONFIG.AUTH + '/siam/authenticate?active=true&callback=' + encodeURIComponent(absUrl + '#'));
    });

    it('can login a user by redirecting to an external security provider, adds # to path when missing', function () {
        absUrl = 'absUrl';
        authenticator.login();
        expect($window.location.href)
            .toBe(API_CONFIG.AUTH + '/siam/authenticate?active=true&callback=' + encodeURIComponent(absUrl + '#'));

        absUrl = 'absUrl#arg';
        authenticator.login();
        expect($window.location.href)
            .toBe(API_CONFIG.AUTH + '/siam/authenticate?active=true&callback=' + encodeURIComponent(absUrl));
    });

    it('can logout a user and then continue as anonymous user', function () {
        spyOn(user, 'clearToken');
        spyOn(user, 'setRefreshToken');
        spyOn(user, 'setAccessToken');

        $httpBackend.whenGET(API_CONFIG.AUTH + '/refreshtoken').respond('refreshtoken');
        $httpBackend.whenGET(API_CONFIG.AUTH + '/accesstoken').respond('accesstoken');

        authenticator.logout();
        expect(user.clearToken).toHaveBeenCalled();

        $httpBackend.flush();
        expect(user.setRefreshToken).toHaveBeenCalledWith('refreshtoken', user.USER_TYPE.ANONYMOUS);
        expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');
    });

    it('can logout an anonymous user and then re-continue as anonymous user', function () {
        spyOn(user, 'getRefreshToken').and.returnValue(null);
        spyOn(user, 'clearToken');
        spyOn(user, 'setRefreshToken');
        spyOn(user, 'setAccessToken');

        $httpBackend.whenGET(API_CONFIG.AUTH + '/refreshtoken').respond('refreshtoken');
        $httpBackend.whenGET(API_CONFIG.AUTH + '/accesstoken').respond('accesstoken');

        authenticator.initialize();
        $httpBackend.flush();
        expect(user.setRefreshToken).toHaveBeenCalledWith('refreshtoken', user.USER_TYPE.ANONYMOUS);
        expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');

        $httpBackend.verifyNoOutstandingRequest();
        user.setRefreshToken.calls.reset();
        user.setRefreshToken.calls.reset();

        authenticator.logout();
        $httpBackend.flush();
        expect(user.clearToken).toHaveBeenCalled();

        expect(user.setRefreshToken).toHaveBeenCalledWith('refreshtoken', user.USER_TYPE.ANONYMOUS);
        expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');
    });

    it('is able to tell whether an url is a callback message from an external security provider', function () {
        expect(authenticator.isCallback({})).toBe(false);
        expect(authenticator.isCallback({one: 1, two: 2})).toBe(false);
        expect(authenticator.isCallback({'a-select-server': 1, 'aselect_credentials': 2, 'rid': 3})).toBe(true);
        expect(authenticator.isCallback({'aselect_credentials': 2, 'rid': 3})).toBe(false);
        expect(authenticator.isCallback({one: 1, 'a-select-server': 1, 'aselect_credentials': 2, 'rid': 3})).toBe(true);
    });

    it('is able to intercept callback messages from external security provider, clears browser history', function () {
        spyOn(user, 'setRefreshToken');
        spyOn(user, 'setAccessToken');
        spyOn($location, 'replace');
        spyOn($location, 'search');

        $httpBackend.whenGET(API_CONFIG.AUTH + '/siam/token?a-select-server=1&aselect_credentials=2&rid=3')
            .respond('token');
        $httpBackend.whenGET(API_CONFIG.AUTH + '/accesstoken').respond('accesstoken');

        authenticator.handleCallback({one: 1, 'a-select-server': 1, 'aselect_credentials': 2, 'rid': 3});
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
        expect(user.setRefreshToken).toHaveBeenCalledWith('token', user.USER_TYPE.AUTHENTICATED);
        expect($location.replace).toHaveBeenCalled();
        expect($location.search).toHaveBeenCalledWith({one: 1});
        expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');
    });

    it('asks for an anonymous access token if a authenticated refresh token fails', function () {
        spyOn(user, 'setRefreshToken');
        spyOn(user, 'setAccessToken');
        spyOn($location, 'replace');
        spyOn($location, 'search');

        $httpBackend.whenGET(API_CONFIG.AUTH + '/siam/token?a-select-server=1&aselect_credentials=2&rid=3')
            .respond(400, 'errorMessage');
        $httpBackend.whenGET(API_CONFIG.AUTH + '/refreshtoken').respond('anonymous token');
        $httpBackend.whenGET(API_CONFIG.AUTH + '/accesstoken').respond('accesstoken');

        authenticator.handleCallback({one: 1, 'a-select-server': 1, 'aselect_credentials': 2, 'rid': 3});
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();

        expect(user.setRefreshToken).toHaveBeenCalledWith('anonymous token', user.USER_TYPE.ANONYMOUS);
    });

    it('asks for an anonymous refresh token if an authenticated access token fails', function () {
        spyOn(user, 'setRefreshToken').and.callThrough();
        spyOn(user, 'setAccessToken').and.callThrough();
        spyOn($location, 'replace');
        spyOn($location, 'search');

        $httpBackend.whenGET(API_CONFIG.AUTH + '/siam/token?a-select-server=1&aselect_credentials=2&rid=3')
            .respond('token');
        let getAccessToken = $httpBackend.whenGET(API_CONFIG.AUTH + '/accesstoken');

        getAccessToken.respond('accesstoken');

        authenticator.handleCallback({one: 1, 'a-select-server': 1, 'aselect_credentials': 2, 'rid': 3});
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();

        expect(user.setRefreshToken).toHaveBeenCalledWith('token', user.USER_TYPE.AUTHENTICATED);
        expect(user.setAccessToken).toHaveBeenCalledWith('accesstoken');
        expect(user.getUserType()).toBe(user.USER_TYPE.AUTHENTICATED);
        user.setRefreshToken.calls.reset();
        user.setAccessToken.calls.reset();

        getAccessToken.respond(400, 'access token error');
        $httpBackend.whenGET(API_CONFIG.AUTH + '/refreshtoken').respond('anonymous token');

        $interval.flush(REFRESH_INTERVAL);   // force refresh of access token
        $httpBackend.flush();

        expect(user.setRefreshToken).toHaveBeenCalledWith('anonymous token', user.USER_TYPE.ANONYMOUS);
        $httpBackend.verifyNoOutstandingRequest();
    });
});
