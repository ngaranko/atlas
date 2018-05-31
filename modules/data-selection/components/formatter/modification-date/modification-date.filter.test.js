describe('The modification-date filter', function () {
    'use strict';

    var modDateFilter;

    beforeEach(function () {
        angular.mock.module('dpDataSelection');

        angular.mock.inject(function ($filter) {
            modDateFilter = $filter('modificationDate');
        });

        var baseTime = new Date('2016-12-15T12:00:00');
        jasmine.clock().mockDate(baseTime);
    });

    it('expects an object with two dates as input', function () {
        expect(modDateFilter()).toBeUndefined();
    });

    it('shows the time as since created: 5 days', function () {
        expect(modDateFilter({
            metadata_created: '2016-12-10T12:00:00'
        })).toBe('5 dagen geleden gemaakt');
    });

    it('shows the time as since created: 4 hours', function () {
        expect(modDateFilter({
            metadata_created: '2016-12-15T08:14:10'
        })).toBe('4 uren geleden gemaakt');
    });

    it('shows the time as since created: 3 minutes', function () {
        expect(modDateFilter({
            metadata_created: '2016-12-15T11:57:04'
        })).toBe('3 minuten geleden gemaakt');
    });

    it('shows the time as since created: 6 seconds', function () {
        expect(modDateFilter({
            metadata_created: '2016-12-15T11:59:54'
        })).toBe('6 seconden geleden gemaakt');
    });

    it('shows the time as since created: future time', function () {
        expect(modDateFilter({
            metadata_created: '2017-12-15T11:59:54'
        })).toBe('is in de toekomst gemaakt');
    });
});
