(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('onMapClick', onMapClickFactory);

    onMapClickFactory.$inject = ['$rootScope', 'store', 'ACTIONS', 'drawTool', 'suppress'];

    function onMapClickFactory ($rootScope, store, ACTIONS, drawTool, suppress) {
        return {
            initialize
        };

        function initialize (leafletMap) {
            leafletMap.on('click', onMapClick);
        }

        function onMapClick (event) {
            console.log('map onClick event');
            if (suppress.isBusy()) {
                console.log('map onClick event busy  =====================================================');
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
