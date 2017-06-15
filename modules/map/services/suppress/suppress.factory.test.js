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

    it('busy should be false by default', function () {
        expect(suppress.isBusy()).toEqual(false);
    });

    it('after start suppressing it should be busy, after the timeout ends it should not be busy anymore', function () {
        suppress.start();
        expect(suppress.isBusy()).toEqual(true);

        $timeout.flush(99);
        expect(suppress.isBusy()).toEqual(true);

        $timeout.flush(1);
        expect(suppress.isBusy()).toEqual(false);
    });
});
