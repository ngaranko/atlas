describe('The debounce factory', function () {
    let debounce,
        $timeout;

    beforeEach(function () {
        angular.mock.module('dpMap');

        angular.mock.inject(function (_$timeout_, _debounce_) {
            $timeout = _$timeout_;
            debounce = _debounce_;
        });
    });

    it('default isIgnoringInput is false', function () {
        expect(debounce.isInDebouncePeriod()).toEqual(false);
    });

    it('after starting isIgnoringInput should first be true and after timeout ends it should be false', function () {
        debounce.startDebouncePeriod();

        expect(debounce.isInDebouncePeriod()).toEqual(true);

        $timeout.flush();

        expect(debounce.isInDebouncePeriod()).toEqual(false);
    });
});
