(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('overlays', overlaysFactory);

    overlaysFactory.$inject = ['$rootScope', 'OVERLAYS'];

    function overlaysFactory ($rootScope, OVERLAYS) {
        const overlays = {
            SOURCES: {},
            HIERARCHY: []
        };

        setOverlays(); // Initialize overlays

        return {
            get SOURCES () {return overlays.SOURCES;},
            get HIERARCHY () {return overlays.HIERARCHY;}
        };

        function setOverlays () {
            overlays.SOURCES = {};
            Object.keys(OVERLAYS.SOURCES)
                .forEach(source => overlays.SOURCES[source] = OVERLAYS.SOURCES[source]);

            overlays.HIERARCHY = angular.copy(OVERLAYS.HIERARCHY)
                .map(hierarchy => {
                    hierarchy.overlays = hierarchy.overlays.filter(overlay => overlays.SOURCES[overlay]);
                    return hierarchy;
                })
                .filter(hierarchy => hierarchy.overlays.length > 0);
        }
    }
})();
