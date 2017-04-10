describe('The filesize filter', function () {
    'use strict';

    let filesizeFilter,
        localization;

    beforeEach(() => {
        localization = jasmine.createSpyObj('localizationFactory', ['toLocaleString']);
        angular.mock.module('dpShared', { localization });

        angular.mock.inject(function ($filter) {
            filesizeFilter = $filter('filesize');
        });

        // simulate replacement of numbers from '1.7' to '1,5' as would be done by localization
        localization.toLocaleString.and.callFake(number => number.replace(/\./g, ','));
    });

    it('returns - on invalid input', () => {
        expect(filesizeFilter()).toEqual('-');
        expect(filesizeFilter('foo')).toEqual('-');
    });

    it('indicates all small sizes as < 0,1 MB', () => {
        expect(filesizeFilter(0)).toEqual('< 0,1 MB');
        expect(filesizeFilter(1)).toEqual('< 0,1 MB');
        expect(filesizeFilter(1024)).toEqual('< 0,1 MB');
        expect(filesizeFilter(100 * 1024 - 1)).toEqual('< 0,1 MB');
    });

    it('uses MB units to show range between <0.1 MB and 1 MB', () => {
        expect(filesizeFilter(120 * 1024)).toEqual('0,1 MB');
        expect(filesizeFilter(500 * 1024 - 1)).toEqual('0,5 MB');
    });

    it('shows MB to one decimal precision', () => {
        expect(filesizeFilter(1.0 * 1024 * 1024)).toEqual('1,0 MB');
        expect(filesizeFilter(1.5 * 1024 * 1024)).toEqual('1,5 MB');
        expect(filesizeFilter(120 * 1024 * 1024)).toEqual('120,0 MB');
    });

    it('shows GB to one decimal precision', () => {
        expect(filesizeFilter(1.0 * 1024 * 1024 * 1024)).toEqual('1,0 GB');
        expect(filesizeFilter(1.1 * 1024 * 1024 * 1024)).toEqual('1,1 GB');
        expect(filesizeFilter(0.1 * 1024 * 1024 * 1024 * 1024)).toEqual('102,4 GB');
    });

    it('shows TB to one decimal precision', () => {
        expect(filesizeFilter(1.0 * 1024 * 1024 * 1024 * 1024)).toEqual('1,0 TB');
        expect(filesizeFilter(1.5 * 1024 * 1024 * 1024 * 1024)).toEqual('1,5 TB');
    });

    it('does not go higher than TB', () => {
        expect(filesizeFilter(777 * 1024 * 1024 * 1024 * 1024)).toEqual('777,0 TB');
        expect(filesizeFilter(7777 * 1024 * 1024 * 1024 * 1024)).toEqual('7777,0 TB');
    });
});
