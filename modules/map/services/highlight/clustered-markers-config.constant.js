(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('CLUSTERED_MARKERS_CONFIG', {
            chunkedLoading: true,
            maxClusterRadius: 50,
            disableClusteringAtZoom: 16,
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: false
        });
})();
