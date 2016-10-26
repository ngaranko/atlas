describe('The http-status component', function () {
    let httpStatus;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_httpStatus_) {
            httpStatus = _httpStatus_;
        });
    });

    it('is able to register any http errors', function () {
        httpStatus.registerError();
        expect(httpStatus.status.hasErrors).toBe(true);
    });

    it('is able to register multiple http errors', function () {
        [1, 2, 3, 4, 5].forEach(() => httpStatus.registerError());
        expect(httpStatus.status.hasErrors).toBe(true);
    });

    it('shows nothing when nothing has happened', function () {
        expect(httpStatus.status.hasErrors).toBe(false);
    });

    it('can be reset after any errors', function () {
        httpStatus.registerError();
        expect(httpStatus.status.hasErrors).toBe(true);

        httpStatus.status.hasErrors = false;
        expect(httpStatus.status.hasErrors).toBe(false);
    });
});
