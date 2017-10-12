describe('The user factory', function () {
    let $httpBackend,
        user;

    // The test access tokens 0, 1, 3, and 99 are for users with auth level
    // 0 (NONE), 1 (EMPLOYEE), 3 (EMPLOYEE_PLUS) and 99 (unknown level, which should map to NONE)

    /* eslint-disable max-len */
    const
        testAccessTokenAuthz0 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODc4NDMwMjgsImV4cCI6MTQ4Nzg0MzMyOCwiYXV0aHoiOjAsInN1YiI6IkkgYW0gdGhlIHN1YiBmaWVsZCJ9.dFYWAzKl_-eoWlnwhnXW7L0bf5y1dy-ECTzbQtZN3gk',
        testAccessTokenAuthz1 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODc4NDMwMjgsImV4cCI6MTQ4Nzg0OTA1NCwiYXV0aHoiOjEsImp0aSI6Ijk1M2U3Y2NlLWEwYzQtNDAyZi1iZTc0LTg3MjY2ZDE3NThjMSJ9.QMu_x1Iys0GX0-zkb3NpZmEPX2rSU9-G7Q59_hlbpFg',
        testAccessTokenAuthz3 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODc4NDMwMjgsImV4cCI6MTQ4Nzg0OTExMCwiYXV0aHoiOjMsImp0aSI6ImY4ZDJiNzQ4LTg2MzAtNDFmOC05Y2M4LWE1Njg4OTUzNTFjOCJ9.TlqGvT5HX979p0IcYm2DgGIIqb45Is6_hAS9F3YOnlU',
        testAccessTokenAuthz99 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODc4NDMwMjgsImV4cCI6MTQ4Nzg0ODc3NiwiYXV0aHoiOjk5LCJqdGkiOiI4Y2VjYTk1My03YzEzLTQwMmMtODIyMS1jM2RjYWE0ZWY1Y2MifQ.LahevkWI06bVCY66khV1z5WKoAByNC_kMSwjKsABkwY';
    /* eslint-enable max-len */

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (
            _$httpBackend_,
            _user_
        ) {
            $httpBackend = _$httpBackend_;
            user = _user_;
        });

        $httpBackend.whenGET('https://www.i-am-the-api-root.com/path/bag/verblijfsobject/123/').respond({});
    });

    describe('The regular behaviour', function () {
        it('can tell the name of the user', function () {
            user.setAccessToken(testAccessTokenAuthz0);
            expect(user.getName()).toBe('I am the sub field');
        });

        it('can tell the authorization level of the user', function () {
            user.setAccessToken(testAccessTokenAuthz0);
            expect(user.getAuthorizationLevel()).toBe(user.AUTHORIZATION_LEVEL.DEFAULT);
            user.setAccessToken(testAccessTokenAuthz1);
            expect(user.getAuthorizationLevel()).toBe(user.AUTHORIZATION_LEVEL.EMPLOYEE);
            user.setAccessToken(testAccessTokenAuthz3);
            expect(user.getAuthorizationLevel()).toBe(user.AUTHORIZATION_LEVEL.EMPLOYEE_PLUS);
        });

        it('returns authorization level NONE for unknown authorization levels', function () {
            user.setAccessToken(testAccessTokenAuthz99);
            expect(user.getAuthorizationLevel()).toBe(user.AUTHORIZATION_LEVEL.NONE);
        });
    });

    describe('The tests wether the user meets a required authorization level', function () {
        const dummyValues = [null, 0, true, false, 'some strange value'];

        it('can test wether the a non-authorized user meets a required authorization level', function () {
            ['NONE']
                .forEach(level => expect(user.meetsRequiredLevel(user.AUTHORIZATION_LEVEL[level])).toBe(true));
            ['DEFAULT', 'EMPLOYEE', 'EMPLOYEE_PLUS']
                .forEach(level => expect(user.meetsRequiredLevel(user.AUTHORIZATION_LEVEL[level])).toBe(false));
            dummyValues.forEach(level => expect(user.meetsRequiredLevel(level)).toBe(false));
            expect(user.meetsRequiredLevel(undefined)).toBe(true);
        });

        it('can test wether a user with unknown auth. level meets a required authorization level', function () {
            user.setAccessToken(testAccessTokenAuthz99);
            expect(user.getAuthorizationLevel()).toBe(user.AUTHORIZATION_LEVEL.NONE);
            ['NONE']
                .forEach(level => expect(user.meetsRequiredLevel(user.AUTHORIZATION_LEVEL[level])).toBe(true));
            ['DEFAULT', 'EMPLOYEE', 'EMPLOYEE_PLUS']
                .forEach(level => expect(user.meetsRequiredLevel(user.AUTHORIZATION_LEVEL[level])).toBe(false));
            dummyValues.forEach(level => expect(user.meetsRequiredLevel(level)).toBe(false));
            expect(user.meetsRequiredLevel(undefined)).toBe(true);
        });

        it('can test wether a DEFAULT user meets a required authorization level', function () {
            user.setAccessToken(testAccessTokenAuthz0);
            expect(user.getAuthorizationLevel()).toBe(user.AUTHORIZATION_LEVEL.DEFAULT);
            ['NONE', 'DEFAULT']
                .forEach(level => expect(user.meetsRequiredLevel(user.AUTHORIZATION_LEVEL[level])).toBe(true));
            ['EMPLOYEE', 'EMPLOYEE_PLUS']
                .forEach(level => expect(user.meetsRequiredLevel(user.AUTHORIZATION_LEVEL[level])).toBe(false));
            dummyValues.forEach(level => expect(user.meetsRequiredLevel(level)).toBe(false));
            expect(user.meetsRequiredLevel(undefined)).toBe(true);
        });

        it('can test wether a EMPLOYEE user meets a required authorization level', function () {
            user.setAccessToken(testAccessTokenAuthz1);
            expect(user.getAuthorizationLevel()).toBe(user.AUTHORIZATION_LEVEL.EMPLOYEE);
            ['NONE', 'DEFAULT', 'EMPLOYEE']
                .forEach(level => expect(user.meetsRequiredLevel(user.AUTHORIZATION_LEVEL[level])).toBe(true));
            ['EMPLOYEE_PLUS']
                .forEach(level => expect(user.meetsRequiredLevel(user.AUTHORIZATION_LEVEL[level])).toBe(false));
            dummyValues.forEach(level => expect(user.meetsRequiredLevel(level)).toBe(false));
            expect(user.meetsRequiredLevel(undefined)).toBe(true);
        });

        it('can test wether a EMPLOYEE_PLUS user meets a required authorization level', function () {
            user.setAccessToken(testAccessTokenAuthz3);
            expect(user.getAuthorizationLevel()).toBe(user.AUTHORIZATION_LEVEL.EMPLOYEE_PLUS);
            ['NONE', 'DEFAULT', 'EMPLOYEE', 'EMPLOYEE_PLUS']
                .forEach(level => expect(user.meetsRequiredLevel(user.AUTHORIZATION_LEVEL[level])).toBe(true));
            dummyValues.forEach(level => expect(user.meetsRequiredLevel(level)).toBe(false));
            expect(user.meetsRequiredLevel(undefined)).toBe(true);
        });
    });
});
