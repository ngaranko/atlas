(function () {
    'use strict';

    angular
        .module('dpDetail')
        .factory('dataFormatter', dataFormatterFactory);

    function dataFormatterFactory () {
        return {
            formatData
        };

        function formatData (data, subject, catalogFilters) {
            switch (subject) {
                case 'api':
                    return formatApiData(data);
                case 'datasets': // dcat data
                    return formatCatalogData(data, catalogFilters);
                default:
                    return data;
            }
        }

        function formatApiData (data) {
            const formattedData = {
                _display: data.result.title
            };
            return [
                'title',
                'publisher',
                'publisher_email',
                'contact_name',
                'contact_email',
                'metadata_created',
                'metadata_modified',
                'notes',
                'resources',
                'tags',
                'license_id',
                'license_title',
                'license_url',
                'groups'
            ].reduce((result, key) => {
                result[key] = data.result[key];
                return result;
            }, formattedData);
        }

        function formatCatalogData (data, catalogFilters) {
            const resourceTypes = catalogFilters.resourceTypes;
            if (!resourceTypes || !data) {
                return {};
            }
            var resources = data['dcat:distribution'];

            const formattedData = {
                _display: data['dct:title'],
                resources: resourceTypes.map(item => {
                    return {
                        type: item.id,
                        rows: resources.filter((row) => row['ams:resourceType'] === item.id)
                    };
                }).filter(resource => resource.rows.length),
                editDatasetUrl: `/dcatd_admin#/datasets/${data['dct:identifier']}`
            };

            return Object.keys(data).filter((key) => key !== 'dcat:distribution')
                .reduce((result, key) => ({
                    ...result,
                    [key]: data[key]
                }), formattedData);
        }
    }
})();
