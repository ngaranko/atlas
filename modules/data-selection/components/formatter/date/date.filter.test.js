describe('The date filter', function () {
    let dateFilter;

    beforeEach(function () {
        angular.mock.module('dpDataSelection');

        angular.mock.inject(function (_dateFilter_) {
            dateFilter = _dateFilter_;
        });
    });

    it('returns empty string when date is unknown', function () {
        const output = dateFilter();
        expect(output).toBe('');
    });

    it('returns the date in dutch format', function () {
        const input = '2018-02-01';
        const output = dateFilter(input);
        expect(output).toBe('1-02-2018');
    });
});
