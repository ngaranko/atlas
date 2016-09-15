(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('orientation', orientationFactory);

    orientationFactory.$inject = ['store', 'ACTIONS', 'angleConversion'];

    function orientationFactory (store, ACTIONS, angleConversion) {
        return {
            update: update
        };

        function update (viewer) {
            var cameraPitch,
                cameraFov,
                heading;

            cameraPitch = viewer.view().pitch();
            cameraFov = viewer.view().fov();
            heading = angleConversion.radiansToDegrees(viewer.view().yaw()); 
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