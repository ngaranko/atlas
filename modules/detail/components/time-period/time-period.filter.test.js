describe('The time-period filter', function () {
    'use strict';

    var timePeriodFilter;

    beforeEach(function () {
        angular.mock.module('dpDataSelection');

        angular.mock.inject(function ($filter) {
            timePeriodFilter = $filter('timePeriod');
        });
    });

    it('expects an object with two dates as input', function () {
        expect(timePeriodFilter()).toBeUndefined();
    });

    it('shows the time period when the time period is provided', function () {
        expect(timePeriodFilter({
            'time:hasBeginning': '2016-12-10T12:00:00',
            'time:hasEnd': '2017-12-10T12:00:00'
        })).toBe('10 december 2016 tot 10 december 2017');
    });

    it('shows an empty string when the time period when the time period is not provided', function () {
        expect(timePeriodFilter({})).toBe('');
    });
});
