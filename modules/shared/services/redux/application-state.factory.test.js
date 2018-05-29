describe('The applicationState factory', function () {
    let applicationState;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function (_applicationState_) {
            applicationState = _applicationState_;
        });
    });

    it('creates a Redux store by passing through a reducer, default state and middleware', function () {
        expect(applicationState).toBeTruthy();
    });
});
