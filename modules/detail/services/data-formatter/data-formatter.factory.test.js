describe('The dataFormatter factory', function () {
    'use strict';

    var dataFormatter;

    beforeEach(function () {
        angular.mock.module('dpDetail');

        angular.mock.inject(function (_dataFormatter_) {
            dataFormatter = _dataFormatter_;
        });
    });

    it('formats API data by selecting only a set of required properties', function () {
        var result = dataFormatter.formatData({
            result: {
                title: 'myTitle',
                publisher: 'publisher',
                publisher_email: 'publisherEmail',
                metadata_created: 'created',
                metadata_modified: 'modified',
                contact_name: 'contactName',
                contact_email: 'contactEmail',
                notes: 'myNotes',
                groups: 'myGroups',
                resources: 'myResources',
                tags: 'myTags',
                license_id: 'license',
                license_title: 'licenseTitle',
                license_url: 'licenseUrl',
                somethingElse: 'aap'

            }
        }, 'api');
        expect(result).toEqual({
            _display: 'myTitle',
            title: 'myTitle',
            publisher: 'publisher',
            publisher_email: 'publisherEmail',
            metadata_created: 'created',
            metadata_modified: 'modified',
            contact_name: 'contactName',
            contact_email: 'contactEmail',
            notes: 'myNotes',
            groups: 'myGroups',
            resources: 'myResources',
            tags: 'myTags',
            license_id: 'license',
            license_title: 'licenseTitle',
            license_url: 'licenseUrl'
        });
    });

    it('returns the original data for non-API data', function () {
        var result = dataFormatter.formatData('aap');
        expect(result).toBe('aap');
    });

    it('uses catalogFiltes to format dcat data', function () {
        const data = {
            'dcat:title': 'title',
            'dcat:distribution': [{
                'ams:resourceType': 'resourceTypeId'
            }]
        };
        const catalogFilters = {
            resourceTypes: [{
                id: 'resourceTypeId',
                label: 'label'
            }]
        }
            ;
        var result = dataFormatter.formatData(data, 'datasets', catalogFilters);
        expect(result).toBeTruthy();
        expect(result['dcat:distribution']).toBe(undefined);
        expect(result).toEqual({
            _display: undefined,
            'dcat:title': 'title',
            resources: [{
                type: 'resourceTypeId',
                rows: [{ 'ams:resourceType': 'resourceTypeId' }]
            }],
            editDatasetUrl: 'dcatd_admin#/datasets/undefined'
        });
    });

    it('returns an empty object when the resourceTypes are not provided to format dcat data', function () {
        const catalogFilters = { };
        var result = dataFormatter.formatData({}, 'datasets', catalogFilters);
        expect(result).toEqual({});
    });
});
