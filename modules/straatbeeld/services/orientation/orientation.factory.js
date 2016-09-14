(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('orientation', orientationFactory);

    orientationFactory.$inject = ['store', 'ACTIONS'];

    function orientationFactory (store, ACTIONS) {
        return {
            update: update
        };

        function update (viewer, heading) {
            var cameraPitch,
                cameraFov;

            cameraPitch = viewer.view().pitch();
            cameraFov = viewer.view().fov();

            store.dispatch({
                type: ACTIONS.STRAATBEELD_SET_ORIENTATION,
                payload: {
                    heading: heading,
                    pitch: cameraPitch,
                    fov: cameraFov
                }
            });
        }
    }
})();