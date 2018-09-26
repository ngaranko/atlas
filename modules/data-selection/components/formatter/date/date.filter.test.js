import * as formatters from '../../../../../src/shared/services/date-formatter/date-formatter';

describe('The date filter', function () {
    let dateFilter;

    beforeEach(function () {
        angular.mock.module('dpDataSelection');

        angular.mock.inject(function (_dateFilter_) {
            dateFilter = _dateFilter_;
        });

        spyOn(formatters, 'dateToString').and.callThrough();
    });

    it('returns empty string when date is unknown', function () {
        const output = dateFilter();
        expect(formatters.dateToString).not.toHaveBeenCalled();
        expect(output).toBe('');
    });

    it('returns the date in dutch format', function () {
        const input = '2018-02-01';
        const output = dateFilter(input);
        expect(formatters.dateToString).toHaveBeenCalled();
        expect(output).toBe('01-02-2018');
    });
});
