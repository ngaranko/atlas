(function () {
    angular
        .module('dpShared')
        .factory('uriStripper', uriStripperFactory);

    uriStripperFactory.$inject = ['sharedConfig'];

    function uriStripperFactory (sharedConfig) {
        return {
            stripDomain,
            restoreDomain
        };

        function stripDomain (uri) {
            let result = [uri];

            const strippedApi = uri.replace(sharedConfig.API_ROOT, '');
            const strippedCatalogus = uri.replace(sharedConfig.CATALOGUS_ROOT, '');

            if (strippedApi !== uri) {
                result = ['API_ROOT', strippedApi];
            } else if (strippedCatalogus !== uri) {
                result = ['CATALOGUS_ROOT', strippedCatalogus];
            }

            return result;
        }

        function restoreDomain (parts) {
            let result;

            if (parts.length === 1) {
                result = parts[0];
            } else {
                // Check root based on white listing for security reasons
                if (sharedConfig.ROOT_KEYS.indexOf(parts[0]) !== -1) {
                    result = sharedConfig[parts[0]] + parts[1];
                } else {
                    result = parts[1];
                }
            }

            return result;
        }
    }
})();
