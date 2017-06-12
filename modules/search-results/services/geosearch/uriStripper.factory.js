(function () {
    angular
        .module('dpSearchResults')
        .factory('uriStripper', uriStripperFactory);

    uriStripperFactory.$inject = ['sharedConfig'];

    function uriStripperFactory (sharedConfig) {
        return {
            stripUri
        };

        function stripUri (uri) {
            // remove first occurrence of API_ROOT
            if (uri) {
                return uri.replace(sharedConfig.API_ROOT, '');
            }
            return uri;
        }
    }
})();
