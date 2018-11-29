describe('The removeSpaces filter', function () {
    'use strict';

    var removeSpacesFilter;

    beforeEach(function () {
        angular.mock.module('dpShared');

        angular.mock.inject(function ($filter) {
            removeSpacesFilter = $filter('removeSpaces');
        });
    });

    it('return a string in lower case and with bars instead of spaces/colons', function () {
        expect(removeSpacesFilter('Rest: Atom Feed')).toEqual('rest-atom-feed');
    });

    it('return an empty string when there is no input', function () {
        expect(removeSpacesFilter(null)).toEqual('');
    });
});
