(function () {
    angular
        .module('dpShared')
        .factory('uriStripper', uriStripperFactory);

    uriStripperFactory.$inject = ['sharedConfig'];

    function uriStripperFactory (sharedConfig) {
        return {
            stripDomain
        };

        function stripDomain (uri) {
            const result = {
                endpoint: uri
            };
            const strippedApi = uri.replace(sharedConfig.API_ROOT, '');
            const strippedCatalogus = uri.replace(sharedConfig.CATALOGUS_ROOT, '');

            if (strippedApi !== uri) {
                result.root = 'API_ROOT';
                result.endpoint = strippedApi;
            } else if (strippedCatalogus !== uri) {
                result.root = 'CATALOGUS_ROOT';
                result.endpoint = strippedCatalogus;
            }

            return result;
        }
    }
})();
