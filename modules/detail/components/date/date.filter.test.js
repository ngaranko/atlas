describe('The dpDate filter', () => {
    let dpDateFilter;

    beforeEach(() => {
        angular.mock.module('dpDetail');

        angular.mock.inject((_dpDateFilter_) => {
            dpDateFilter = _dpDateFilter_;
        });
    });

    it('formats YYYY-MM-DD dates to a Dutch locale variant (through angular-i18n)', () => {
        expect(dpDateFilter('2017-01-31')).toBe('31 januari 2017');
    });

    it('doesn\'t show leading zeros', () => {
        expect(dpDateFilter('2017-02-01')).toBe('1 februari 2017');
    });

    it('can handle old dates as well', () => {
        expect(dpDateFilter('1969-05-24')).toBe('24 mei 1969');
        expect(dpDateFilter('1830-08-12')).toBe('12 augustus 1830');
    });
});
