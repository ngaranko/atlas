(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('clusteredMarkersConfig', clusteredMarkersConfig);

    clusteredMarkersConfig.$inject = ['L'];

    function clusteredMarkersConfig (L) {
        return {
            chunkedLoading: true,
            maxClusterRadius: 50,
            disableClusteringAtZoom: 16,
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: false,
            iconCreateFunction: function (cluster) {
                const count = cluster.getChildCount();
                return L.divIcon({
                    html: `<div aria-label="Cluster met ${count} onderdelen" class="o-highlight-` +
                      `cluster__text">${count}</div>`,
                    className: 'o-highlight-cluster',
                    iconSize: L.point(39, 39),
                    iconAnchor: L.point(19, 19)
                });
            }
        };
    }
})();
