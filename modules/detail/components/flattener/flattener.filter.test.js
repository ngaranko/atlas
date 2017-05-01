describe('The flattener filter', () => {
    let flattenerFilter;

    beforeEach(() => {
        angular.mock.module('dpDetail');

        angular.mock.inject((_flattenerFilter_) => {
            flattenerFilter = _flattenerFilter_;
        });
    });

    it('returns a flattened array with input array', () => {
        expect(flattenerFilter([1, 2])).toEqual([1, 2]);
    });

    it('returns a flattened array with nested input array', () => {
        expect(flattenerFilter([[3, 4], [2, 6]])).toEqual([3, 4, 2, 6]);
    });

    it('returns a flattened array with a doubly nested array', () => {
        expect(flattenerFilter([[[7, 6], [3, 4]]])).toEqual([7, 6, 3, 4]);
    });

    it('returns empty array when input array is empty', () => {
        expect(flattenerFilter([])).toEqual([]);
    });

    it('returns empty array when input is not an array', () => {
        expect(flattenerFilter('aap')).toEqual(['aap']);
    });
});
