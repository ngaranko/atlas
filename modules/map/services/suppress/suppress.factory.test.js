describe('The suppress factory', function () {
    let suppress,
        $timeout;

    beforeEach(function () {
        angular.mock.module('dpMap');

        angular.mock.inject(function (_$timeout_, _suppress_) {
            $timeout = _$timeout_;
            suppress = _suppress_;
        });
    });

    it('default isIgnoringInput is false', function () {
        expect(suppress.isBusy()).toEqual(false);
    });

    it('after starting isIgnoringInput should first be true and after timeout ends it should be false', function () {
        suppress.start();

        expect(suppress.isBusy()).toEqual(true);

        $timeout.flush();

        expect(suppress.isBusy()).toEqual(false);
    });
});
