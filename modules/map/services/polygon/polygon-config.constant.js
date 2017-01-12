(function () {
    'use strict';

    angular
        .module('dpMap')
        .constant('POLYGON_CONFIG', {
            edit: {
            },
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: true,
                    showLength: true,
                    metric: ['km', 'm'],
                    precision: {
                        m: 1
                    }
                },
                marker: false,
                circle: false,
                rectangle: false,
                polyline: false
            }
        });
})();
