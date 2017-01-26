(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('onMapClick', onMapClickFactory);

    onMapClickFactory.$inject = ['$rootScope', 'store', 'ACTIONS'];

    function onMapClickFactory ($rootScope, store, ACTIONS) {
        return {
            initialize
        };

        function initialize (leafletMap) {
            leafletMap.on('click', onMapClick);
        }

        function onMapClick (event) {
            if (['DRAW', 'EDIT'].indexOf(store.getState().map.drawingMode) === -1) {
                $rootScope.$applyAsync(function () {
                    store.dispatch({
                        type: ACTIONS.MAP_CLICK,
                        payload: [
                            event.latlng.lat,
                            event.latlng.lng
                        ]
                    });
                });
            }
        }
    }
})();
