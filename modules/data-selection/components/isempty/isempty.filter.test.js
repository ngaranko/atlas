describe('The isempty filter', function() {
    var isempty;

    beforeEach(function () {
        angular.mock.module('dpDataSelection');

        angular.mock.inject(function ($filter) {
            isempty = $filter('isempty');
        });
    });

    it('does output an empty input as (geen)', function() {
        expect(isempty('')).toBe('(geen)');
        expect(isempty(null)).toBe('(geen)');
        expect(isempty(undefined)).toBe('(geen)');
    });

    it('does not touch any non-empty input', function() {
        expect(isempty('X')).toBe('X');
        expect(isempty('1')).toBe('1');
        expect(isempty(1)).toBe(1);
        expect(isempty(true)).toBe(true);
        expect(isempty([])).toEqual([]);
        expect(isempty([1,2])).toEqual([1,2]);
        expect(isempty({})).toEqual({});
        expect(isempty({a:1})).toEqual({a:1});
    });

});
