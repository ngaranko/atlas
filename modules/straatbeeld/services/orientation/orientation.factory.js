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
            const heading = radiansToDegrees(viewer.view().yaw());
            const pitch = radiansToDegrees(viewer.view().pitch());
            const fov = radiansToDegrees(viewer.view().fov());

            store.dispatch({
                type: ACTIONS.SET_STRAATBEELD_ORIENTATION,
                payload: {
                    heading,
                    pitch,
                    fov
                }
            });
        }
    }
})();
