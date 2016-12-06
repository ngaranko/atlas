(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('CLUSTERED_MARKERS_CONFIG', {
            chunkedLoading: true,
            disableClusteringAtZoom: 14,
            maxClusterRadius: 50,
            showCoverageOnHover: false
        });
})();
