describe('The api factory', function () {
    var $rootScope,
        $http,
        $httpBackend,
        $q,
        api,
        mockedApiData,
        user,
        isLoggedIn;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                user: {
                    getAccessToken: () => isLoggedIn ? 'MY_FAKE_ACCESS_TOKEN' : null,
                    waitForAccessToken: () => $q.resolve(user.getAccessToken()),
                    getRefreshToken: angular.noop
                },
                sharedConfig: {
                    API_ROOT: 'http://www.i-am-the-api-root.com/path/',
                    AUTH_HEADER_PREFIX: 'Bearer '
                }
            }
        );

        angular.mock.inject(function (_$rootScope_, _$http_, _$httpBackend_, _$q_, _api_, _user_) {
            $rootScope = _$rootScope_;
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            api = _api_;
            user = _user_;
        });

        mockedApiData = {
            id: 1,
            title: 'This is a fake title'
        };

        $httpBackend.whenGET('http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/').respond(mockedApiData);

        isLoggedIn = false;
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('getByUrl returns the data as a promise', function () {
        var returnValue;

        api.getByUrl('http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/').then(function (data) {
            returnValue = data;
        });

        $httpBackend.flush();

        expect(returnValue).toEqual(mockedApiData);
    });

    it('getByUrl optionally accepts a promise to allow for cancelling the request', function () {
        const cancel = $q.defer();

        api.getByUrl('http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/', undefined, cancel)
            .then(function () {
                fail();   // Should never be resolved
            });

        cancel.resolve();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('getByUrl optionally accepts a promise, rejects the promise when the request is not cancelled', function () {
        var returnValue;
        const cancel = $q.defer();

        api.getByUrl('http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/', undefined, cancel)
            .then(function (data) {
                returnValue = data;
            });

        let isRejected = false;
        cancel.promise.then(angular.noop, () => isRejected = true);

        $httpBackend.flush();

        expect(returnValue).toEqual(mockedApiData);
        expect(isRejected).toBe(true);
    });

    it('getByUri can be used when the API ROOT is unknown', function () {
        var returnValue;

        api.getByUri('bag/verblijfsobject/123/').then(function (data) {
            returnValue = data;
        });

        $httpBackend.flush();

        expect(returnValue).toEqual(mockedApiData);
    });

    it('adds an Authorization header if the user is logged in', function () {
        // Not logged in
        isLoggedIn = false;

        $httpBackend.expectGET(
            'http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/',
            $http.defaults.headers.common
        );
        api.getByUrl('http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/');
        $httpBackend.flush();

        // Logged in
        isLoggedIn = true;

        $httpBackend.expectGET(
            'http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/',
            angular.merge({}, $http.defaults.headers.common, {Authorization: 'Bearer MY_FAKE_ACCESS_TOKEN'})
        );
        api.getByUrl('http://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/');
        $httpBackend.flush();
    });
    describe('generating a URL with an access token', () => {
        it('adds the access token when logged in', () => {
            isLoggedIn = true;
            checkMappings(new Map([
                [['http://test.amsterdam.nl/'], 'http://test.amsterdam.nl/?access_token=MY_FAKE_ACCESS_TOKEN'],
                [['http://test.amsterdam.nl/?a=b'], 'http://test.amsterdam.nl/?a=b&access_token=MY_FAKE_ACCESS_TOKEN']
            ]));
        });

        it('does not add the access token when not logged in', () => {
            isLoggedIn = false;
            checkMappings(new Map([
                [['http://test.amsterdam.nl/'], 'http://test.amsterdam.nl/'],
                [['http://test.amsterdam.nl/?a=b'], 'http://test.amsterdam.nl/?a=b']
            ]));
        });

        it('adds extra params to the url when specified', () => {
            isLoggedIn = false;
            checkMappings(new Map([
                [['http://test.amsterdam.nl/'], 'http://test.amsterdam.nl/'],
                [['http://test.amsterdam.nl/?a=b'], 'http://test.amsterdam.nl/?a=b']
            ]));
        });

        function checkMappings (mappings) {
            for (const [input, expected] of mappings) {
                api.createUrlWithToken(...input).then(actual => {
                    expect(actual).toBe(expected);
                });
            }
            $rootScope.$digest();
        }
    });
});
