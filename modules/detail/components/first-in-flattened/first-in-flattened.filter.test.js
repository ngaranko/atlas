describe('The flatten filter', () => {
    let firstInFlattenedFilter;

    beforeEach(() => {
        angular.mock.module('dpDetail');

        angular.mock.inject((_firstInFlattenedFilter_) => {
            firstInFlattenedFilter = _firstInFlattenedFilter_;
        });
    });

    it('returns the first coordinate from single array with 2 elements', () => {
        expect(firstInFlattenedFilter([1, 2])).toBe('1,2');
    });

    it('returns the first coordinate from nested array', () => {
        expect(firstInFlattenedFilter([[3, 4], [2, 6]])).toBe('3,4');
    });

    it('returns the first coordinate from a doubly nested array', () => {
        expect(firstInFlattenedFilter([[[7, 6], [3, 4]]])).toBe('7,6');
    });

    it('returns empty string when input array is empty', () => {
        expect(firstInFlattenedFilter([])).toBe('');
    });
    it('returns empty string when input is string', () => {
        expect(firstInFlattenedFilter('aap')).toBe('');
    });
});
