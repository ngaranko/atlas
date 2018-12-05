import { radiansToDegrees } from '../../../../src/shared/services/angle-conversion/angle-conversion';

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

        function update (viewer) {
            var pitch,
                fov,
                heading;

            if (!viewer.view()) return;
            pitch = radiansToDegrees(viewer.view().pitch());
            fov = radiansToDegrees(viewer.view().fov());
            heading = radiansToDegrees(viewer.view().yaw());

            store.dispatch({
                type: ACTIONS.SET_STRAATBEELD_ORIENTATION,
                payload: {
                    heading: heading,
                    pitch: pitch,
                    fov: fov
                }
            });
        }
    }
})();
