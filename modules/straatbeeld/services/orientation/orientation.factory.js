import { radiansToDegrees } from '../../../../src/shared/services/angle-conversion/angle-conversion';
import { SET_STRAATBEELD_ORIENTATION } from '../../../../src/shared/ducks/straatbeeld/straatbeeld';

(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('orientation', orientationFactory);

    orientationFactory.$inject = ['store'];

    function orientationFactory (store) {
        return {
            update: update
        };

        function update (viewer) {
            var pitch,
                fov,
                heading;

            pitch = radiansToDegrees(viewer.view().pitch());
            fov = radiansToDegrees(viewer.view().fov());
            heading = radiansToDegrees(viewer.view().yaw());

            store.dispatch({
                type: SET_STRAATBEELD_ORIENTATION,
                payload: {
                    heading: heading,
                    pitch: pitch,
                    fov: fov
                }
            });
        }
    }
})();
