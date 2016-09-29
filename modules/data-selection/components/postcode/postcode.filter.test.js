describe('The postcode filter', function() {
    var postcode;

    beforeEach(function () {
        angular.mock.module('dpDataSelection');

        angular.mock.inject(function ($filter) {
            postcode = $filter('postcode');
        });
    });

    it('does format a 1234AB formatted postcode', function() {
        expect(postcode('1234AB')).toBe('1234 AB');
    });

    it('does not format a non-1234AB formatted postcode', function() {
        expect(postcode('X')).toBe('X');
        expect(postcode('1234 AB')).toBe('1234 AB');
    });

    it('does show empty postcodes as (leeg)', function() {
        expect(postcode('')).toBe('');
        expect(postcode(null)).toBeNull();
        expect(postcode(undefined)).toBeUndefined();
    });
});
