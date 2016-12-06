(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('CLUSTERED_MARKERS_CONFIG', {
            showCoverageOnHover: false,
            disableClusteringAtZoom: 14
        });
})();
