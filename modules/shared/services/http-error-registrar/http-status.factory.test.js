import {
    setGlobalError
} from '../../../../src/shared/ducks/error-message.js';

describe('The http-status component', function () {
    let httpStatus,
        $window,
        Raven;

    beforeEach(function () {
        Raven = {
            captureMessage: jasmine.createSpy()
        };

        angular.mock.module('dpShared', {
            Raven
        });

        angular.mock.inject(function (_$window_, _httpStatus_) {
            $window = _$window_;
            httpStatus = _httpStatus_;
        });

        $window.reduxStore = {
            dispatch: jasmine.createSpy('dispatch')
        };
    });

    it('captures error messages', () => {
        const message = 'my message';
        httpStatus.logResponse(message);

        expect(Raven.captureMessage).toHaveBeenCalledWith(
            new Error(message),
            {
                tags: { statusCode: undefined }
            }
        );
    });

    it('captures error messages status codes', () => {
        const message = 'my message';
        const code = 404;
        httpStatus.logResponse(message, code);

        expect(Raven.captureMessage).toHaveBeenCalledWith(
            new Error(message),
            {
                tags: { statusCode: code }
            }
        );
    });

    it('sets the error type given', () => {
        const errorType = 'foo';
        httpStatus.registerError(errorType);
        expect($window.reduxStore.dispatch).toHaveBeenCalledWith(
            setGlobalError(errorType)
        );
    });
});
