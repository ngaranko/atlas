import {
    setGlobalError
} from '../../../../src/shared/ducks/error-message.js';

describe('The http-status component', function () {
    let httpStatus,
        $window;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_$window_, _httpStatus_) {
            $window = _$window_;
            httpStatus = _httpStatus_;
        });

        $window.reduxStore = {
            dispatch: jasmine.createSpy('dispatch')
        };
    });

    it('sets the error type given', function () {
        const errorType = 'foo';
        httpStatus.registerError(errorType);
        expect($window.reduxStore.dispatch).toHaveBeenCalledWith(
            setGlobalError(errorType)
        );
    });
});
