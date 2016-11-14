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
        expect(httpStatus.getStatus().hasErrors).toBe(true);
    });

    it('defaults to error type SERVER when no error type is given', function () {
        httpStatus.registerError();
        expect(httpStatus.getStatus().errorType).toBe('SERVER');
    });

    it('sets the error type given', function () {
        httpStatus.registerError('NOT_FOUND');
        expect(httpStatus.getStatus().errorType).toBe('NOT_FOUND');
    });

    it('silently defaults to error type SERVER when an erroneous error type is given', function () {
        httpStatus.registerError('FAULTY_ERROR_TYPE');
        expect(httpStatus.getStatus().errorType).toBe('SERVER');
    });

    it('is able to register multiple http errors', function () {
        [1, 2, 3, 4, 5].forEach(() => httpStatus.registerError());
        expect(httpStatus.getStatus().hasErrors).toBe(true);
    });

    it('uses the last provided error type', function () {
        ['SERVER', 'SERVER', 'SERVER', 'SERVER', 'NOT_FOUND'].forEach(
            type => httpStatus.registerError(type));
        expect(httpStatus.getStatus().errorType).toBe('NOT_FOUND');
    });

    it('shows nothing when nothing has happened', function () {
        expect(httpStatus.getStatus().hasErrors).toBe(false);
    });
});
