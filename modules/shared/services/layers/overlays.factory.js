(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('overlays', overlaysFactory);

    overlaysFactory.$inject = ['$rootScope', 'OVERLAYS', 'user'];

    function overlaysFactory ($rootScope, OVERLAYS, user) {
        let overlays = {
            SOURCES: {},
            HIERARCHY: []
        };

        setOverlays();  // Initialize overlays

        // Update overlays on any change in the authorization level of the user
        $rootScope.$on('$destroy', $rootScope.$watch(() => user.getAuthorizationLevel(), setOverlays));

        return {
            overlays,
            SOURCES: overlays.SOURCES,
            HIERARCHY: overlays.HIERARCHY
        };

        function setOverlays () {
            overlays.SOURCES = Object.keys(OVERLAYS.SOURCES)
                .filter(source => user.meetsRequiredLevel(OVERLAYS.SOURCES[source].authorizationLevel))
                .reduce((sources, source) => {
                    sources[source] = OVERLAYS.SOURCES[source];
                    return sources;
                }, {});

            overlays.HIERARCHY = angular.copy(OVERLAYS.HIERARCHY)
                .map(hierarchy => {
                    hierarchy.overlays = hierarchy.overlays.filter(overlay => overlays.SOURCES[overlay]);
                    return hierarchy;
                })
                .filter(hierarchy => hierarchy.overlays.length > 0);
        }
    }
})();
