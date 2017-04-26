describe('The flatten filter', () => {
    let firstInFlattenedFilter;

    beforeEach(() => {
        angular.mock.module('dpDetail');

        angular.mock.inject((_firstInFlattenedFilter_) => {
            firstInFlattenedFilter = _firstInFlattenedFilter_;
        });
    });

    it('returns the first coordinate from flattened array 1', () => {
        expect(firstInFlattenedFilter([1, 2])).toBe('1,2');
    });

    it('returns the first coordinate from flattened array 2', () => {
        expect(firstInFlattenedFilter([[3, 4], [2, 6]])).toBe('3,4');
    });

    it('returns the first coordinate from flattened array 3', () => {
        expect(firstInFlattenedFilter([[[7, 6], [3, 4]]])).toBe('7,6');
    });

    it('returns the first coordinate from flattened array 4', () => {
        expect(firstInFlattenedFilter([])).toBe('');
    });
    it('returns the first coordinate from flattened array 5', () => {
        expect(firstInFlattenedFilter('aap')).toBe('');
    });
});
