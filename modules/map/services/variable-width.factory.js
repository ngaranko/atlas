(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('variableWidth', variableWidthFactory);

    variableWidthFactory.$inject = ['$rootScope'];

    function variableWidthFactory ($rootScope) {
        return {
            initialize: initialize
        };

        function initialize (container, leafletMap) {
            /* eslint-disable angular/on-watch */
            $rootScope.$watch(function () {
                /* eslint-enable angular/on-watch */
                return container.clientWidth;
            }, function (newWidth, oldWidth) {
                if (newWidth !== oldWidth) {
                    leafletMap.invalidateSize();
                }
            });
        }
    }
})();