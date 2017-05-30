(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('onMapClick', onMapClickFactory);

    onMapClickFactory.$inject = ['$rootScope', 'store', 'ACTIONS', 'drawTool', 'debounce'];

    function onMapClickFactory ($rootScope, store, ACTIONS, drawTool, debounce) {
        return {
            initialize
        };

        function initialize (leafletMap) {
            leafletMap.on('click', onMapClick);
        }

        function onMapClick (event) {
            const inDebouncePeriod = debounce.isInDebouncePeriod();
            if(inDebouncePeriod) {
                console.log('skipping clickmap event');
                return;
            }

            if (!drawTool.isEnabled()) {
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
