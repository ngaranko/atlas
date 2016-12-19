describe('The dataFormatter factory', function () {
    'use strict';

    var dataFormatter;

    beforeEach(function () {
        angular.mock.module('dpDetail');

        angular.mock.inject(function (_dataFormatter_) {
            dataFormatter = _dataFormatter_;
        });
    });

    it('formats API data', function () {
        var result = dataFormatter.formatData({
            result: {
                title: 'myTitle',
                author: 'myAuthor',
                author_email: 'email',
                metadata_created: 'created',
                metadata_modified: 'modified',
                notes: 'myNotes',
                resources: 'myResources',
                tags: 'myTags',
                license_id: 'license',
                somethingElse: 'aap'

            }
        }, 'api');
        expect(result).toEqual(
            {
                _display: 'myTitle',
                title: 'myTitle',
                author: 'myAuthor',
                author_email: 'email',
                metadata_created: 'created',
                metadata_modified: 'modified',
                notes: 'myNotes',
                resources: 'myResources',
                tags: 'myTags',
                license_id: 'license'
            }
        );
    });

    it('returns the original data for non-API data', function () {
        var result = dataFormatter.formatData('aap');
        expect(result).toBe('aap');
    });
});
